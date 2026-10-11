import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../../../config/api";

const ADMIN_KEY_STORAGE = "aapleGurujiAdminKey";

const FUNNEL_STAGES = [
  "details_submitted",
  "otp_sent",
  "email_verified",
  "booking_submitted",
  "abandoned",
];

const SAMAGRI_FIELDS = [
  {
    key: "includedWithPackage",
    label: "Included with package",
  },
  {
    key: "customerArrangedChecklist",
    label: "Customer-arranged checklist",
  },
  {
    key: "householdRequirements",
    label: "Household requirements",
  },
];

const emptyUser = {
  name: "",
  mobile: "",
  email: "",
};

const emptySamagriDraft = {
  includedWithPackage: "",
  customerArrangedChecklist: "",
  householdRequirements: "",
};

const emptyPujaDraft = {
  slug: "",
  nameEn: "",
  nameMr: "",
  category: "",
  shortDescriptionEn: "",
  shortDescriptionMr: "",
  descriptionEn: "",
  descriptionMr: "",
  thumbnail: "",
  displayOrder: 0,
  active: true,
};

const toPujaDraft = (puja) => ({
  slug: puja.slug || "",
  nameEn: puja.name?.en || "",
  nameMr: puja.name?.mr || "",
  category: puja.category || "",
  shortDescriptionEn: puja.shortDescription?.en || "",
  shortDescriptionMr: puja.shortDescription?.mr || "",
  descriptionEn: puja.description?.en || "",
  descriptionMr: puja.description?.mr || "",
  thumbnail: puja.images?.thumbnail || "",
  displayOrder: puja.displayOrder || 0,
  active: puja.availability?.active !== false,
});

const toPujaPayload = (draft) => ({
  slug: draft.slug,
  name: { en: draft.nameEn, mr: draft.nameMr },
  category: draft.category,
  shortDescription: { en: draft.shortDescriptionEn, mr: draft.shortDescriptionMr },
  description: { en: draft.descriptionEn, mr: draft.descriptionMr },
  images: { thumbnail: draft.thumbnail, gallery: [] },
  displayOrder: Number(draft.displayOrder),
  availability: { active: draft.active, locations: [] },
});

const toLines = (items = []) => items.join("\n");

const toSamagriDraft = (samagri = {}) =>
  SAMAGRI_FIELDS.reduce(
    (draft, { key }) => ({ ...draft, [key]: toLines(samagri[key]) }),
    emptySamagriDraft,
  );

const toSamagriPayload = (draft) =>
  SAMAGRI_FIELDS.reduce(
    (samagri, { key }) => ({
      ...samagri,
      [key]: draft[key]
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    }),
    {},
  );

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

const inputClass =
  "w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900";

const AdminPage = () => {
  const [adminKey, setAdminKey] = useState(() =>
    sessionStorage.getItem(ADMIN_KEY_STORAGE) || "",
  );
  const [enteredKey, setEnteredKey] = useState("");
  const [users, setUsers] = useState([]);
  const [pujas, setPujas] = useState([]);
  const [selectedPujaId, setSelectedPujaId] = useState("");
  const [pujaDraft, setPujaDraft] = useState(emptyPujaDraft);
  const [editingPujaId, setEditingPujaId] = useState(null);
  const [addingPuja, setAddingPuja] = useState(false);
  const [samagriDraft, setSamagriDraft] = useState(emptySamagriDraft);
  const [newUser, setNewUser] = useState(emptyUser);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const headers = useMemo(
    () => ({ "x-admin-key": adminKey }),
    [adminKey],
  );

  const loadAdminData = useCallback(async () => {
    if (!adminKey) return;

    setLoading(true);
    setError("");
    try {
      const [usersResponse, pujasResponse] = await Promise.all([
        api.get("/admin/users", { headers }),
        api.get("/admin/pujas", { headers }),
      ]);
      setUsers(usersResponse.data.data);
      setPujas(pujasResponse.data.data);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to load admin data"));
    } finally {
      setLoading(false);
    }
  }, [adminKey, headers]);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  useEffect(() => {
    if (!selectedPujaId && pujas.length) {
      setSelectedPujaId(pujas[0]._id);
    }
  }, [pujas, selectedPujaId]);

  const selectedPuja = pujas.find((puja) => puja._id === selectedPujaId);

  useEffect(() => {
    if (selectedPuja) {
      setSamagriDraft(toSamagriDraft(selectedPuja.samagri));
    }
  }, [selectedPuja]);

  const saveAdminKey = (event) => {
    event.preventDefault();
    const nextKey = enteredKey.trim();
    if (!nextKey) return;

    sessionStorage.setItem(ADMIN_KEY_STORAGE, nextKey);
    setAdminKey(nextKey);
    setError("");
  };

  const clearAdminKey = () => {
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    setAdminKey("");
    setEnteredKey("");
    setUsers([]);
    setPujas([]);
    setError("");
    setNotice("");
  };

  const createUser = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await api.post("/admin/users", newUser, { headers });
      setUsers((currentUsers) => [response.data.data, ...currentUsers]);
      setNewUser(emptyUser);
      setNotice("User created");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to create user"));
    } finally {
      setSaving(false);
    }
  };

  const updateUser = async (event) => {
    event.preventDefault();
    if (!editingUser) return;

    setSaving(true);
    setError("");
    try {
      const response = await api.patch(
        `/admin/users/${editingUser._id}`,
        {
          name: editingUser.name,
          mobile: editingUser.mobile,
          email: editingUser.email,
          funnelStage: editingUser.funnelStage,
          isEmailVerified: Boolean(editingUser.isEmailVerified),
        },
        { headers },
      );
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user._id === response.data.data._id ? response.data.data : user,
        ),
      );
      setEditingUser(null);
      setNotice("User updated");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to update user"));
    } finally {
      setSaving(false);
    }
  };

  const deleteUser = async (user) => {
    if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) return;

    setSaving(true);
    setError("");
    try {
      await api.delete(`/admin/users/${user._id}`, { headers });
      setUsers((currentUsers) =>
        currentUsers.filter((currentUser) => currentUser._id !== user._id),
      );
      if (editingUser?._id === user._id) setEditingUser(null);
      setNotice("User deleted");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to delete user"));
    } finally {
      setSaving(false);
    }
  };

  const saveSamagri = async (event) => {
    event.preventDefault();
    if (!selectedPuja) return;

    setSaving(true);
    setError("");
    try {
      const response = await api.patch(
        `/admin/pujas/${selectedPuja._id}/samagri`,
        { samagri: toSamagriPayload(samagriDraft) },
        { headers },
      );
      setPujas((currentPujas) =>
        currentPujas.map((puja) =>
          puja._id === response.data.data._id ? response.data.data : puja,
        ),
      );
      setNotice(`${response.data.data.name.en} Samagri updated`);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to update samagri"));
    } finally {
      setSaving(false);
    }
  };

  const savePuja = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = toPujaPayload(pujaDraft);
      const currentPuja = pujas.find((puja) => puja._id === editingPujaId);
      if (currentPuja) {
        payload.images.gallery = currentPuja.images?.gallery || [];
        payload.availability.locations = currentPuja.availability?.locations || [];
      }
      const response = editingPujaId
        ? await api.patch(`/admin/pujas/${editingPujaId}`, payload, { headers })
        : await api.post("/admin/pujas", payload, { headers });
      const savedPuja = response.data.data;
      setPujas((current) => editingPujaId
        ? current.map((puja) => puja._id === savedPuja._id ? savedPuja : puja)
        : [...current, savedPuja].sort((a, b) => a.displayOrder - b.displayOrder));
      setPujaDraft(emptyPujaDraft);
      setEditingPujaId(null);
      setAddingPuja(false);
      setNotice(editingPujaId ? "Puja updated" : "Puja added");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to save puja"));
    } finally {
      setSaving(false);
    }
  };

  if (!adminKey) {
    return (
      <main className="mx-auto min-h-screen max-w-xl bg-slate-100 p-6 text-slate-900">
        <h1 className="text-2xl font-bold">Admin access</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter the server&apos;s admin access key to manage pujas, users, and Samagri.
        </p>
        <form className="mt-6 space-y-4" onSubmit={saveAdminKey}>
          <input
            className={inputClass}
            type="password"
            value={enteredKey}
            onChange={(event) => setEnteredKey(event.target.value)}
            placeholder="Admin access key"
            autoComplete="current-password"
            required
          />
          <button className="rounded bg-slate-900 px-4 py-2 text-white" type="submit">
            Open admin panel
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin panel</h1>
            <p className="text-sm text-slate-600">Manage pujas, customer leads, and Samagri.</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded border border-slate-400 px-3 py-2" type="button" onClick={loadAdminData}>
              Refresh data
            </button>
            <button className="rounded bg-slate-800 px-3 py-2 text-white" type="button" onClick={clearAdminKey}>
              Lock panel
            </button>
          </div>
        </header>

        {loading && <p className="text-sm text-slate-600">Loading admin data…</p>}
        {error && <p className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        {notice && <p className="rounded border border-green-300 bg-green-50 p-3 text-sm text-green-800">{notice}</p>}

        <section className="space-y-4 rounded border border-slate-300 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Pujas</h2>
              <p className="text-sm text-slate-600">Add pujas and edit the details shown in the public puja catalog.</p>
            </div>
            <button className="rounded bg-slate-900 px-4 py-2 text-white" type="button" onClick={() => { setAddingPuja(true); setEditingPujaId(null); setPujaDraft(emptyPujaDraft); }}>Add puja</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="border-b border-slate-200 text-slate-600"><tr><th className="p-2">Name</th><th className="p-2">Category</th><th className="p-2">Status</th><th className="p-2">Order</th><th className="p-2">Action</th></tr></thead>
              <tbody>{pujas.map((puja) => <tr className="border-b border-slate-100" key={puja._id}>
                <td className="p-2">{puja.name?.en || puja.slug}</td><td className="p-2">{puja.category}</td><td className="p-2">{puja.availability?.active === false ? "Hidden" : "Shown"}</td><td className="p-2">{puja.displayOrder || 0}</td>
                <td className="p-2"><button className="underline" type="button" onClick={() => { setAddingPuja(false); setEditingPujaId(puja._id); setPujaDraft(toPujaDraft(puja)); }}>Edit</button></td>
              </tr>)}{!pujas.length && <tr><td className="p-3 text-slate-600" colSpan="5">No pujas found.</td></tr>}</tbody>
            </table>
          </div>
          {(addingPuja || editingPujaId) && <form className="grid gap-3 border-t border-slate-200 pt-4 md:grid-cols-2" onSubmit={savePuja}>
            <input className={inputClass} value={pujaDraft.nameEn} onChange={(e) => setPujaDraft({ ...pujaDraft, nameEn: e.target.value })} placeholder="Name (English)" required />
            <input className={inputClass} value={pujaDraft.nameMr} onChange={(e) => setPujaDraft({ ...pujaDraft, nameMr: e.target.value })} placeholder="Name (Marathi)" required />
            <input className={inputClass} value={pujaDraft.slug} onChange={(e) => setPujaDraft({ ...pujaDraft, slug: e.target.value })} placeholder="URL slug" required />
            <input className={inputClass} value={pujaDraft.category} onChange={(e) => setPujaDraft({ ...pujaDraft, category: e.target.value })} placeholder="Category" required />
            <input className={inputClass} value={pujaDraft.shortDescriptionEn} onChange={(e) => setPujaDraft({ ...pujaDraft, shortDescriptionEn: e.target.value })} placeholder="Short description (English)" />
            <input className={inputClass} value={pujaDraft.shortDescriptionMr} onChange={(e) => setPujaDraft({ ...pujaDraft, shortDescriptionMr: e.target.value })} placeholder="Short description (Marathi)" />
            <textarea className={`${inputClass} min-h-24`} value={pujaDraft.descriptionEn} onChange={(e) => setPujaDraft({ ...pujaDraft, descriptionEn: e.target.value })} placeholder="Description (English)" />
            <textarea className={`${inputClass} min-h-24`} value={pujaDraft.descriptionMr} onChange={(e) => setPujaDraft({ ...pujaDraft, descriptionMr: e.target.value })} placeholder="Description (Marathi)" />
            <input className={inputClass} value={pujaDraft.thumbnail} onChange={(e) => setPujaDraft({ ...pujaDraft, thumbnail: e.target.value })} placeholder="Thumbnail image URL" />
            <input className={inputClass} type="number" min="0" value={pujaDraft.displayOrder} onChange={(e) => setPujaDraft({ ...pujaDraft, displayOrder: e.target.value })} placeholder="Display order" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={pujaDraft.active} onChange={(e) => setPujaDraft({ ...pujaDraft, active: e.target.checked })} /> Show in puja catalog</label>
            <div className="flex gap-2"><button className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50" disabled={saving} type="submit">{editingPujaId ? "Save puja" : "Create puja"}</button><button className="rounded border border-slate-400 px-4 py-2" type="button" onClick={() => { setAddingPuja(false); setEditingPujaId(null); }}>Cancel</button></div>
          </form>}
        </section>

        <section className="space-y-4 rounded border border-slate-300 bg-white p-5">
          <div>
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-sm text-slate-600">Customer leads captured by the booking flow.</p>
          </div>

          <form className="grid gap-3 md:grid-cols-4" onSubmit={createUser}>
            <input
              className={inputClass}
              value={newUser.name}
              onChange={(event) => setNewUser({ ...newUser, name: event.target.value })}
              placeholder="Full name"
              required
            />
            <input
              className={inputClass}
              value={newUser.mobile}
              onChange={(event) => setNewUser({ ...newUser, mobile: event.target.value })}
              placeholder="10-digit mobile"
              required
            />
            <input
              className={inputClass}
              type="email"
              value={newUser.email}
              onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
              placeholder="Email"
              required
            />
            <button className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50" disabled={saving} type="submit">
              Add user
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Mobile</th>
                  <th className="p-2">Stage</th>
                  <th className="p-2">Verified</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="border-b border-slate-100" key={user._id}>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.mobile}</td>
                    <td className="p-2">{user.funnelStage}</td>
                    <td className="p-2">{user.isEmailVerified ? "Yes" : "No"}</td>
                    <td className="space-x-3 p-2">
                      <button className="underline" type="button" onClick={() => setEditingUser({ ...user })}>
                        Edit
                      </button>
                      <button className="text-red-700 underline" type="button" onClick={() => deleteUser(user)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {!loading && !users.length && (
                  <tr><td className="p-3 text-slate-600" colSpan="6">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {editingUser && (
            <form className="grid gap-3 border-t border-slate-200 pt-4 md:grid-cols-3" onSubmit={updateUser}>
              <input className={inputClass} value={editingUser.name} onChange={(event) => setEditingUser({ ...editingUser, name: event.target.value })} required />
              <input className={inputClass} value={editingUser.mobile} onChange={(event) => setEditingUser({ ...editingUser, mobile: event.target.value })} required />
              <input className={inputClass} type="email" value={editingUser.email} onChange={(event) => setEditingUser({ ...editingUser, email: event.target.value })} required />
              <select className={inputClass} value={editingUser.funnelStage} onChange={(event) => setEditingUser({ ...editingUser, funnelStage: event.target.value })}>
                {FUNNEL_STAGES.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
              </select>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(editingUser.isEmailVerified)} onChange={(event) => setEditingUser({ ...editingUser, isEmailVerified: event.target.checked })} /> Email verified</label>
              <div className="flex gap-2">
                <button className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50" disabled={saving} type="submit">Save user</button>
                <button className="rounded border border-slate-400 px-4 py-2" type="button" onClick={() => setEditingUser(null)}>Cancel</button>
              </div>
            </form>
          )}
        </section>

        <section className="space-y-4 rounded border border-slate-300 bg-white p-5">
          <div>
            <h2 className="text-xl font-semibold">Samagri</h2>
            <p className="text-sm text-slate-600">Add one item per line, then save it for the selected Puja.</p>
          </div>

          <select className={inputClass} value={selectedPujaId} onChange={(event) => setSelectedPujaId(event.target.value)}>
            {!pujas.length && <option value="">No Pujas available</option>}
            {pujas.map((puja) => <option key={puja._id} value={puja._id}>{puja.name?.en || puja.name}</option>)}
          </select>

          {selectedPuja && (
            <form className="space-y-4" onSubmit={saveSamagri}>
              {SAMAGRI_FIELDS.map(({ key, label }) => (
                <label className="block" key={key}>
                  <span className="mb-1 block text-sm font-medium">{label}</span>
                  <textarea
                    className={`${inputClass} min-h-40`}
                    value={samagriDraft[key]}
                    onChange={(event) => setSamagriDraft({ ...samagriDraft, [key]: event.target.value })}
                    placeholder="One item per line"
                  />
                </label>
              ))}
              <button className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50" disabled={saving} type="submit">
                Save Samagri
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminPage;
