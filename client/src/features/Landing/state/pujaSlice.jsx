import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pujas: [
    {
      _id: "1",
      slug: "satyanarayan-puja",
      name: {
        en: "Satyanarayan Puja",
        mr: "सत्यनारायण पूजा",
      },
      category: "General Puja",
      shortDescription: {
        en: "Traditional puja for peace, prosperity and harmony.",
        mr: "शांतता, समृद्धी आणि सौहार्द आणण्यासाठी पारंपरिक पूजा.",
      },
      description: {
        en: "Satyanarayan Puja is performed to seek blessings from Lord Vishnu for peace, prosperity and harmony. It is commonly conducted on full moon days or special occasions like housewarming, marriage, or after achieving success.",
        mr: "सत्यनारायण पूजा शांतता, समृद्धी आणि सौहार्द आणण्यासाठी भगवान विष्णूंचा आशीर्वाद मिळवण्यासाठी केली जाते. सामान्यतः पौर्णिमेला किंवा गृहप्रवेश, लग्न किंवा यश मिळाल्यानंतर विशेष प्रसंगी केली जाते.",
      },
      benefits: [
        "Peace and harmony in family",
        "Prosperity and wealth",
        "Success in endeavors",
        "Divine blessings",
      ],
      serviceHighlights: [
        "Verified Guruji with experience",
        "Clear puja procedure explained to the family",
        "Punctuality and traditional attire",
        "Samagri delivery if selected",
        "Flexible timing",
        "Transparent pricing",
        "Free consultation before booking",
        "Phone and WhatsApp support",
      ],
      images: {
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Satya_Narayan_Puja.JPG/1280px-Satya_Narayan_Puja.JPG",
        gallery: [],
      },
      samagri: {
        includedWithPackage: [],
        customerArrangedChecklist: [],
        householdRequirements: [],
      },
      packages: [
        {
          id: "with-samagri",
          name: {
            en: "With Puja Material + Guruji Fees",
            mr: "पूजा साहित्य आणि गुरुजी दक्षिणेसह",
          },
          price: 2500,
          currency: "INR",
          includesSamagri: true,
          advanceAmount: 500,
          advanceDeductedFromTotal: true,
          features: [
            "Essential puja materials included",
            "Guruji Dakshina included",
            "Material handling included",
            "Advance booking required",
          ],
          active: true,
        },
        {
          id: "without-samagri",
          name: {
            en: "Only Guruji Fees",
            mr: "फक्त गुरुजी दक्षिणा",
          },
          price: 1500,
          currency: "INR",
          includesSamagri: false,
          advanceAmount: 500,
          advanceDeductedFromTotal: true,
          features: [
            "Customer arranges puja materials",
            "Puja material checklist provided in advance",
            "Guruji Dakshina included",
            "Advance booking required",
          ],
          active: true,
        },
      ],
      booking: {
        advanceAmount: 500,
        advanceDeductedFromTotal: true,
        consultationAvailable: true,
        contactChannels: ["phone", "whatsapp"],
      },
      availability: {
        active: true,
        locations: ["Pune", "Mumbai", "Nashik"],
      },
      displayOrder: 1,
    },
    {
      _id: "2",
      slug: "griha-pravesh",
      name: {
        en: "Griha Pravesh Puja",
        mr: "गृहप्रवेश पूजा",
      },
      category: "Griha Puja",
      shortDescription: {
        en: "Sacred housewarming ceremony for new home.",
        mr: "नवीन घरासाठी पवित्र गृहप्रवेश समारंभ.",
      },
      description: {
        en: "Griha Pravesh Puja is performed before entering a new house to purify the space and seek blessings for a prosperous life. It removes negative energies and brings positivity to the new home.",
        mr: "गृहप्रवेश पूजा नवीन घरात प्रवेश करण्यापूर्वी जागा शुद्ध करण्यासाठी आणि समृद्ध जीवनासाठी आशीर्वाद मिळवण्यासाठी केली जाते. ही नकारात्मक ऊर्जा काढून टाकते आणि नवीन घरात सकारात्मकता आणते.",
      },
      benefits: [
        "Removes negative energies",
        "Brings prosperity",
        "Peace in new home",
        "Divine protection",
      ],
      serviceHighlights: [
        "Complete Vastu Shanti included",
        "Traditional rituals",
        "Expert pandits",
        "All materials arranged",
      ],
      images: {
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Kattila_vekkal.jpg/1280px-Kattila_vekkal.jpg",
        gallery: [],
      },
      samagri: {
        includedWithPackage: [],
        customerArrangedChecklist: [],
        householdRequirements: [],
      },
      packages: [
        {
          id: "with-samagri",
          name: {
            en: "Complete Kit + Guruji",
            mr: "संपूर्ण किट + गुरुजी",
          },
          price: 5000,
          currency: "INR",
          includesSamagri: true,
          advanceAmount: 1000,
          advanceDeductedFromTotal: true,
          features: [
            "All puja materials",
            "Guruji fees",
            "Vastu yantra",
            "Complete ceremony",
          ],
          active: true,
        },
        {
          id: "without-samagri",
          name: {
            en: "Only Guruji",
            mr: "फक्त गुरुजी",
          },
          price: 3000,
          currency: "INR",
          includesSamagri: false,
          advanceAmount: 1000,
          advanceDeductedFromTotal: true,
          features: [
            "Guruji fees",
            "Guidance for materials",
            "Complete ceremony",
          ],
          active: true,
        },
      ],
      booking: {
        advanceAmount: 1000,
        advanceDeductedFromTotal: true,
        consultationAvailable: true,
        contactChannels: ["phone", "whatsapp"],
      },
      availability: {
        active: true,
        locations: ["Pune", "Mumbai", "Nashik", "Nagpur"],
      },
      displayOrder: 2,
    },
    {
      _id: "3",
      slug: "vaastu-shanti",
      name: {
        en: "Vaastu Shanti Puja",
        mr: "वास्तुशांती पूजा",
      },
      category: "Griha Puja",
      shortDescription: {
        en: "Traditional puja for peace, prosperity and harmony.",
        mr: "घरात शांतता, समृद्धी आणि सौहार्द आणण्यासाठी पारंपरिक पूजा.",
      },
      description: {
        en: "Vaastu Shanti Puja is performed to seek blessings, promote harmony and purify the surroundings. It is commonly conducted before moving into a new house, after renovations, or during personal or professional difficulties. The ritual may include a havan.",
        mr: "वास्तुशांती पूजा घर किंवा कार्यालयातील नकारात्मक ऊर्जा दूर करण्यासाठी आणि शांतता, समृद्धी व सौहार्द आणण्यासाठी केली जाते. नवीन घरात प्रवेश करण्यापूर्वी, घराची दुरुस्ती केल्यानंतर किंवा वैयक्तिक अथवा व्यावसायिक अडचणी असताना ही पूजा केली जाते. यामध्ये हवनाचाही समावेश असतो.",
      },
      benefits: [
        "Peace and harmony",
        "Prosperity and well-being",
        "Traditional blessings for the home",
      ],
      serviceHighlights: [
        "Verified Guruji with experience",
        "Clear puja procedure explained to the family",
        "Punctuality and traditional attire",
        "Samagri delivery if selected",
        "Flexible timing",
        "Transparent pricing",
        "Free consultation before booking",
        "Phone and WhatsApp support",
      ],
      images: {
        thumbnail: "",
        gallery: [],
      },
      samagri: {
        includedWithPackage: [],
        customerArrangedChecklist: [],
        householdRequirements: [],
      },
      packages: [
        {
          id: "with-samagri",
          name: {
            en: "With Puja Material + Guruji Fees",
            mr: "पूजा साहित्य आणि गुरुजी दक्षिणेसह",
          },
          price: 15000,
          currency: "INR",
          includesSamagri: true,
          advanceAmount: 4000,
          advanceDeductedFromTotal: true,
          features: [
            "Essential puja materials included",
            "Guruji Dakshina included",
            "Material handling included",
            "Advance booking required",
          ],
          active: true,
        },
        {
          id: "without-samagri",
          name: {
            en: "Only Guruji Fees",
            mr: "फक्त गुरुजी दक्षिणा",
          },
          price: 12000,
          currency: "INR",
          includesSamagri: false,
          advanceAmount: 4000,
          advanceDeductedFromTotal: true,
          features: [
            "Customer arranges puja materials",
            "Puja material checklist provided in advance",
            "Guruji Dakshina included",
            "Advance booking required",
          ],
          active: true,
        },
      ],
      booking: {
        advanceAmount: 4000,
        advanceDeductedFromTotal: true,
        consultationAvailable: true,
        contactChannels: ["phone", "whatsapp"],
      },
      availability: {
        active: true,
        locations: ["Pune"],
      },
      displayOrder: 3,
    },
    {
      _id: "4",
      slug: "maha-mrityunjaya-puja",
      name: {
        en: "Maha Mrityunjaya Puja",
        mr: "महा मृत्युंजय पूजा",
      },
      category: "Health Puja",
      shortDescription: {
        en: "Powerful puja for health and longevity.",
        mr: "आरोग्य आणि दीर्घायुष्यासाठी शक्तिशाली पूजा.",
      },
      description: {
        en: "Maha Mrityunjaya Puja is dedicated to Lord Shiva and is performed to overcome health issues, prevent untimely death, and seek longevity. It is one of the most powerful pujas for healing and protection.",
        mr: "महा मृत्युंजय पूजा भगवान शिवांची समर्पित आहे आणि आरोग्य समस्या दूर करण्यासाठी, अकाली मृत्यू टाळण्यासाठी आणि दीर्घायुष्य मिळवण्यासाठी केली जाते. औषध आणि संरक्षणासाठी ही सर्वात शक्तिशाली पूजांपैकी एक आहे.",
      },
      benefits: [
        "Good health and healing",
        "Protection from diseases",
        "Longevity",
        "Mental peace",
      ],
      serviceHighlights: [
        "Authentic Vedic rituals",
        "Experienced priests",
        "Rudrabhishek included",
        "Sacred mantras",
      ],
      images: {
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Shiva_the_hindu_god_statue.jpg/1280px-Shiva_the_hindu_god_statue.jpg",
        gallery: [],
      },
      samagri: {
        includedWithPackage: [],
        customerArrangedChecklist: [],
        householdRequirements: [],
      },
      packages: [
        {
          id: "with-samagri",
          name: {
            en: "Complete Ceremony + Materials",
            mr: "संपूर्ण समारंभ + सामग्री",
          },
          price: 8000,
          currency: "INR",
          includesSamagri: true,
          advanceAmount: 2000,
          advanceDeductedFromTotal: true,
          features: [
            "Rudrabhishek",
            "All materials",
            "Priest fees",
            "Prasad",
          ],
          active: true,
        },
        {
          id: "without-samagri",
          name: {
            en: "Ceremony Only",
            mr: "फक्त समारंभ",
          },
          price: 5000,
          currency: "INR",
          includesSamagri: false,
          advanceAmount: 2000,
          advanceDeductedFromTotal: true,
          features: [
            "Rudrabhishek",
            "Priest fees",
            "Prasad",
          ],
          active: true,
        },
      ],
      booking: {
        advanceAmount: 2000,
        advanceDeductedFromTotal: true,
        consultationAvailable: true,
        contactChannels: ["phone", "whatsapp"],
      },
      availability: {
        active: true,
        locations: ["Pune", "Mumbai"],
      },
      displayOrder: 4,
    },
    {
      _id: "5",
      slug: "ganesh-puja",
      name: {
        en: "Ganesh Puja",
        mr: "गणेश पूजा",
      },
      category: "Festival Puja",
      shortDescription: {
        en: "Worship Lord Ganesha for success and new beginnings.",
        mr: "यश आणि नवीन सुरुवातीसाठी भगवान गणेशाची पूजा.",
      },
      description: {
        en: "Ganesh Puja is performed to seek blessings from Lord Ganesha, the remover of obstacles. It is ideal for starting new ventures, before important events, or during Ganesh Chaturthi.",
        mr: "गणेश पूजा विघ्नहर्ता भगवान गणेशाचा आशीर्वाद मिळवण्यासाठी केली जाते. ही नवीन उपक्रम सुरू करण्यासाठी, महत्त्वाच्या कार्यक्रमांआधी किंवा गणेश चतुर्थीदरम्यान करण्यासाठी आदर्श आहे.",
      },
      benefits: [
        "Removes obstacles",
        "Success in new ventures",
        "Wisdom and knowledge",
        "Prosperity",
      ],
      serviceHighlights: [
        "Traditional Ganesh worship",
        "Sacred offerings",
        "Expert priests",
        "Custom timing available",
      ],
      images: {
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ganesh_Chaturthi_2021.jpg/1280px-Ganesh_Chaturthi_2021.jpg",
        gallery: [],
      },
      samagri: {
        includedWithPackage: [],
        customerArrangedChecklist: [],
        householdRequirements: [],
      },
      packages: [
        {
          id: "with-samagri",
          name: {
            en: "Full Puja + Materials",
            mr: "पूर्ण पूजा + सामग्री",
          },
          price: 3000,
          currency: "INR",
          includesSamagri: true,
          advanceAmount: 1000,
          advanceDeductedFromTotal: true,
          features: [
            "All puja materials",
            "Priest fees",
            "Modak and sweets",
            "Complete ritual",
          ],
          active: true,
        },
        {
          id: "without-samagri",
          name: {
            en: "Puja Only",
            mr: "फक्त पूजा",
          },
          price: 1500,
          currency: "INR",
          includesSamagri: false,
          advanceAmount: 1000,
          advanceDeductedFromTotal: true,
          features: [
            "Priest fees",
            "Complete ritual",
            "Prasad",
          ],
          active: true,
        },
      ],
      booking: {
        advanceAmount: 1000,
        advanceDeductedFromTotal: true,
        consultationAvailable: true,
        contactChannels: ["phone", "whatsapp"],
      },
      availability: {
        active: true,
        locations: ["Pune", "Mumbai", "Nashik"],
      },
      displayOrder: 5,
    },
    {
      _id: "6",
      slug: "navagraha-puja",
      name: {
        en: "Navagraha Puja",
        mr: "नवग्रह पूजा",
      },
      category: "Planetary Puja",
      shortDescription: {
        en: "Puja to appease nine planets for favorable results.",
        mr: "अनुकूल परिणामांसाठी नऊ ग्रहांची पूजा.",
      },
      description: {
        en: "Navagraha Puja is performed to appease the nine planets and seek their blessings for favorable results in life. It helps overcome planetary doshas and brings positive energy.",
        mr: "नवग्रह पूजा नऊ ग्रहांना खूश करण्यासाठी आणि जीवनात अनुकूल परिणामांसाठी त्यांचा आशीर्वाद मिळवण्यासाठी केली जाते. ही ग्रह दोष दूर करण्यासाठी मदत करते आणि सकारात्मक ऊर्जा आणते.",
      },
      benefits: [
        "Reduces planetary doshas",
        "Better career prospects",
        "Health benefits",
        "Peace of mind",
      ],
      serviceHighlights: [
        "All nine planets worship",
        "Vedic mantras",
        "Experienced astrologers",
        "Customized remedies",
      ],
      images: {
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Navagraha.jpg/1280px-Navagraha.jpg",
        gallery: [],
      },
      samagri: {
        includedWithPackage: [],
        customerArrangedChecklist: [],
        householdRequirements: [],
      },
      packages: [
        {
          id: "with-samagri",
          name: {
            en: "Complete Navagraha Shanti",
            mr: "संपूर्ण नवग्रह शांती",
          },
          price: 6000,
          currency: "INR",
          includesSamagri: true,
          advanceAmount: 1500,
          advanceDeductedFromTotal: true,
          features: [
            "All materials",
            "Nine planets worship",
            "Priest fees",
            "Remedies",
          ],
          active: true,
        },
        {
          id: "without-samagri",
          name: {
            en: "Puja Only",
            mr: "फक्त पूजा",
          },
          price: 4000,
          currency: "INR",
          includesSamagri: false,
          advanceAmount: 1500,
          advanceDeductedFromTotal: true,
          features: [
            "Nine planets worship",
            "Priest fees",
            "Remedies",
          ],
          active: true,
        },
      ],
      booking: {
        advanceAmount: 1500,
        advanceDeductedFromTotal: true,
        consultationAvailable: true,
        contactChannels: ["phone", "whatsapp"],
      },
      availability: {
        active: true,
        locations: ["Pune", "Mumbai"],
      },
      displayOrder: 6,
    },
  ],
  selectedPuja: null,
  loading: false,
  error: null,
};

const pujaSlice = createSlice({
  name: "puja",
  initialState,
  reducers: {
    setSelectedPuja: (state, action) => {
      state.selectedPuja = action.payload;
    },
    clearSelectedPuja: (state) => {
      state.selectedPuja = null;
    },
  },
});

export const { setSelectedPuja, clearSelectedPuja } = pujaSlice.actions;
export default pujaSlice.reducer;
