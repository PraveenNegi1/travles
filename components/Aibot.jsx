"use client";

import { useState, useRef, useEffect } from "react";

const PREDEFINED_QA = [
  {
    id: "q1",
    question: "What is Uttarakhand?",
    answer:
      "Uttarakhand is a state in northern India known for its natural beauty, Hindu temples, and Himalayan mountains. Formed in 2000 from the northwestern portion of Uttar Pradesh, it's often called 'Devbhumi' (Land of Gods) due to its numerous sacred sites. The state is divided into two regions: Garhwal in the northwest and Kumaon in the southeast, offering diverse landscapes from snow-capped peaks to lush valleys, national parks, and pilgrimage sites.",
  },
  {
    id: "q2",
    question: "How can I reach Uttarakhand?",
    answer:
      "Uttarakhand is accessible through multiple transportation options. By air, you can fly to Dehradun's Jolly Grant Airport, which has connections to major Indian cities. By train, major railway stations include Dehradun, Haridwar, Kathgodam, and Haldwani, connected to Delhi and other major cities. By road, Uttarakhand has well-maintained highways connecting it to Delhi, Chandigarh, and other northern cities, with regular bus services. Within the state, shared taxis, local buses, and private cabs facilitate internal transportation.",
  },
  {
    id: "q3",
    question: "What is the best time to visit Uttarakhand?",
    answer:
      "The ideal time to visit Uttarakhand depends on your interests. For general tourism, March to June offers pleasant weather for exploring most destinations. July to September brings monsoon season, beautiful greenery but also landslides in some areas. October to February provides clear mountain views and is perfect for winter sports in places like Auli, though higher altitudes experience heavy snowfall. For pilgrimage routes like Char Dham, May to June and September to October are recommended as many temples remain closed during winter.",
  },
  {
    id: "q4",
    question: "What are the major tourist destinations in Uttarakhand?",
    answer:
      "Uttarakhand offers diverse attractions including spiritual sites like Haridwar and Rishikesh along the Ganges River, and the Char Dham circuit (Yamunotri, Gangotri, Kedarnath, Badrinath). Popular hill stations include Mussoorie, Nainital, Almora, and Ranikhet. Adventure enthusiasts enjoy Auli for skiing and Jim Corbett National Park for wildlife. The Valley of Flowers National Park and Hemkund Sahib attract nature lovers and pilgrims. Dehradun, the capital, serves as a gateway with its own attractions like Robber's Cave and Mindrolling Monastery.",
  },
  {
    id: "q5",
    question: "What's the historical and cultural significance of Uttarakhand?",
    answer:
      "Uttarakhand has a rich history dating back to ancient times when it was mentioned in Hindu epics as 'Kedarkhand' and 'Manaskhand.' Historically, it was part of the Kumaon and Garhwal kingdoms before being conquered by the Gurkhas and later the British. Culturally, the region has distinctive Garhwali and Kumaoni traditions, folklore, cuisine, and architecture. The state has been a center for spiritual learning and meditation for millennia, with ashrams and temples dotting its landscape. Its unique pahari (mountain) culture is evident in local festivals, folk dances like Langvir Nritya and Chholiya, and traditional crafts.",
  },
  {
    id: "q6",
    question: "What budget should I plan for a trip to Uttarakhand?",
    answer:
      "A trip to Uttarakhand can accommodate various budgets. For budget travelers, expect to spend ₹1,500-2,500 per day including modest accommodation (₹500-1,000), meals (₹300-500), and local transportation. Mid-range travelers should budget ₹3,000-5,000 daily for better hotels (₹1,500-3,000), dining (₹800-1,200), activities, and transportation. Luxury travelers might spend ₹8,000-15,000+ daily with premium accommodations (₹5,000-10,000+), fine dining, and private transportation. Additional costs include entry fees to attractions (₹50-500), adventure activities (₹1,000-5,000), and shopping. Char Dham pilgrimage packages typically range from ₹15,000-50,000 depending on duration and comfort level.",
  },
  {
    id: "q7",
    question: "What are the popular trekking routes in Uttarakhand?",
    answer:
      "Uttarakhand is a trekking paradise with routes for all expertise levels. Beginner-friendly treks include Nag Tibba (2-3 days), Chopta-Chandrashila (3 days), and Dayara Bugyal (2-4 days). Moderate treks include Valley of Flowers (5-6 days), Kuari Pass (5-6 days), and Har Ki Dun (7 days). Challenging options include Roopkund (7-8 days), Gangotri-Gaumukh-Tapovan (8-9 days), and Bali Pass (10-12 days). The best trekking seasons are pre-monsoon (April-June) and post-monsoon (September-November). Most treks require permits, and hiring local guides is recommended for safety and supporting the local economy.",
  },
  {
    id: "q8",
    question: "What accommodation options are available in Uttarakhand?",
    answer:
      "Uttarakhand offers diverse accommodation options. Budget travelers can find guesthouses and ashrams (₹500-1,500/night), especially in pilgrimage towns like Rishikesh and Haridwar. Mid-range options include comfortable hotels and homestays (₹1,500-4,000/night) in most tourist destinations. Luxury travelers can enjoy premium resorts and boutique properties (₹5,000-15,000+/night) in places like Mussoorie, Nainital, and Corbett. For authentic experiences, forest rest houses managed by the Forest Department provide unique stays amid nature. During peak seasons (summer and major festivals), advance booking is essential. In remote areas, government-run Tourist Rest Houses provide reliable accommodation.",
  },
  {
    id: "q9",
    question: "What local cuisine should I try in Uttarakhand?",
    answer:
      "Uttarakhand's cuisine features hearty mountain foods with regional variations between Garhwali and Kumaoni cooking. Must-try dishes include Kafuli (spinach preparation), Mandua ki Roti (finger millet flatbread), Jhangora ki Kheer (barnyard millet pudding), Aloo ke Gutke (spiced potato preparation), and Bhatt ki Churkani (black soybean dish). Traditional meals are often served on plates made from Palash or Mahwa leaves. Local beverages include Buransh (rhododendron) juice and Jhootha (rice beer). In touristy areas, you'll find diverse options from North Indian to international cuisines, while remote villages offer authentic pahari food experiences.",
  },
  {
    id: "q10",
    question: "What essential items should I pack for an Uttarakhand trip?",
    answer:
      "For an Uttarakhand trip, pack according to season and destinations. Essential clothing includes layerable options with warm jackets even in summer as mountain evenings get cold. Include sturdy walking shoes, rain protection, sun protection (hats, sunglasses, sunscreen), and modest clothing for temple visits. Practical items should include a first-aid kit with altitude sickness medication, insect repellent, flashlight, power bank, reusable water bottle, and toilet paper/hand sanitizer for remote areas. Carry some cash as ATMs are limited in remote regions. For trekking, add appropriate gear including trekking poles, quality backpack, thermal wear, and sleeping bag depending on your specific route requirements.",
  },
  {
    id: "q11",
    question:
      "What adventure activities are available in Uttarakhand beyond trekking?",
    answer:
      "Uttarakhand offers numerous adventure activities besides trekking. Rishikesh is famous for white water rafting on the Ganges with rapids ranging from Grade I to IV. Paragliding opportunities exist in Ranikhet, Mukteshwar, and Bhimtal. Auli provides excellent skiing facilities during winter months (December-February). Rock climbing and mountaineering expeditions are popular in the Garhwal Himalayas, with training institutes in Uttarkashi. Other activities include mountain biking in Mussoorie and surrounding areas, camping in scenic locations like Chopta and Dhanaulti, bungee jumping and flying fox in Rishikesh, and wildlife safaris in Jim Corbett and Rajaji National Parks. For water enthusiasts, kayaking and cliff jumping are available at various river spots.",
  },
  {
    id: "q12",
    question: "How should I prepare for the Char Dham Yatra in Uttarakhand?",
    answer:
      "For the Char Dham Yatra (Yamunotri, Gangotri, Kedarnath, Badrinath), thorough preparation is essential. Plan at least 10-12 days for the complete circuit. Register for the official Yatra and obtain necessary permits online before arrival. Physical fitness preparation is crucial, especially for Kedarnath which involves a challenging 16 km trek. Pack appropriately with warm, layered clothing, comfortable walking shoes, rain protection, and basic medications including those for altitude sickness. Consider hiring local guides or joining organized tours that handle logistics. Acclimatize properly to prevent altitude-related issues, especially at Kedarnath and Badrinath which are at high elevations. The pilgrimage routes typically remain open from April/May to October/November, with precise dates announced annually based on religious calendars and weather conditions.",
  },
  {
    id: "q13",
    question: "What wildlife can be spotted in Uttarakhand's national parks?",
    answer:
      "Uttarakhand's diverse ecosystems host rich wildlife across its six national parks and numerous sanctuaries. Jim Corbett National Park, India's oldest national park, is famous for Bengal tigers, Asian elephants, leopards, and over 600 bird species. Rajaji National Park features elephants, tigers, leopards, deer species, and sloth bears. The high-altitude Nanda Devi National Park (a UNESCO World Heritage site) protects rare Himalayan species like snow leopards, Himalayan black bears, musk deer, and colorful pheasants. Valley of Flowers National Park showcases rare alpine flowers, alongside Himalayan tahrs and occasional sightings of red fox. Gangotri National Park is home to snow leopards, brown bears, and blue sheep. Best wildlife viewing periods are generally March to June and October to February, with organized safaris available in most protected areas.",
  },
  {
    id: "q14",
    question: "What are the traditional arts and crafts of Uttarakhand?",
    answer:
      "Uttarakhand has a vibrant tradition of arts and crafts reflecting its mountain culture. Aipan is a ritualistic folk art featuring geometric patterns painted with rice paste on red backgrounds for auspicious occasions. Woodcarving is prominent, especially in the Kumaon region, with intricate designs on doors, windows, and household items. Ringaal bamboo craft produces utilitarian items like baskets, mats, and containers. Copper work (Tamta) creates decorative and religious items, while woolen handloom products include Pankhi shawls, Thulma carpets, and colorful Garhwali caps (Pahari Topi). Wax printing on fabric is practiced in specific regions. The state also produces distinctive wooden masks used in local folk performances and Pahari miniature paintings with religious themes. Visitors can purchase authentic crafts from state emporiums in major towns or directly from artisan villages.",
  },
  {
    id: "q15",
    question: "What are the major festivals celebrated in Uttarakhand?",
    answer:
      "Uttarakhand celebrates numerous vibrant festivals throughout the year. Kumbh Mela, held in Haridwar every 12 years, attracts millions of pilgrims for holy dips in the Ganges (next occurring in 2034). The colorful Holi is celebrated with unique regional traditions like Khadi Holi (musical gatherings) and Baithki Holi (sitting celebrations) in Kumaon. Harela, a significant agricultural festival, marks the planting season with seedling ceremonies and special dishes. Phool Dei in spring features children bringing flowers to households for good fortune. Other important celebrations include Uttarayani Mela in Bageshwar with cultural performances, Nanda Devi Raj Jat Yatra (occurring every 12 years) which is a lengthy pilgrimage procession, Basant Panchami marking the arrival of spring, and Makar Sankranti which features ritual bathing in sacred rivers. Most festivals include unique regional folk dances, traditional music, and special culinary preparations.",
  },
  {
    id: "q16",
    question:
      "What precautions should visitors take regarding health and safety in Uttarakhand?",
    answer:
      "When visiting Uttarakhand, several health and safety precautions are important. For health, acclimatize gradually when traveling to high altitudes (above 2,500m) to prevent altitude sickness, staying hydrated and avoiding alcohol. Carry necessary medications including those for altitude sickness, stomach issues, and personal prescriptions. Drink only bottled or purified water and be cautious with street food, especially during monsoon. For safety, check weather forecasts and road conditions regularly, particularly during monsoon (July-September) when landslides are common. Register with local authorities before undertaking remote treks. Respect wildlife by maintaining distance and following park rules. Dress modestly when visiting religious sites. During winter travel in higher regions, check for road closures due to snow. Cell phone connectivity may be limited in remote areas, so inform someone about your itinerary. For emergency assistance, contact the Uttarakhand Tourism helpline or the local police.",
  },
  {
    id: "q17",
    question:
      "What are some lesser-known destinations in Uttarakhand worth visiting?",
    answer:
      "Beyond the popular tourist spots, Uttarakhand offers many hidden gems. Munsiyari, near the Tibet border, provides spectacular Himalayan panoramas including Panchachuli peaks without the typical crowds. Kausani, which Gandhi called the 'Switzerland of India,' offers stunning sunrise views over Himalayan ranges. Abbott Mount, a tiny hill station established during British rule, features colonial architecture and peaceful surroundings. Chakrata, once a restricted military area, has pristine forests and waterfalls like Tiger Falls. Chaukori in the Kumaon region offers tea gardens with mountain backdrops. The ancient temple complex of Jageshwar contains over 100 small stone temples dating from the 8th-18th centuries. Khirsu provides panoramic views of snow-capped peaks with few tourists. For unique cultural experiences, visit the Mana village (last Indian village near Badrinath), Kalap in remote Garhwal known for traditional lifestyles, or Peora with its fruit orchards and terraced farms.",
  },
  {
    id: "q18",
    question:
      "What should I know about the local customs and etiquette in Uttarakhand?",
    answer:
      "Understanding local customs enhances your Uttarakhand experience. Religious sites require modest dress (covering shoulders and knees) and removing footwear before entering temples. Photography may be prohibited inside certain shrines; always ask permission before photographing people, especially during ceremonies. Greet locals with a respectful 'Namaste' with folded hands. The culture is generally conservative, so public displays of affection should be avoided. When visiting homes, small gifts are appreciated; remove shoes before entering. Traditional village homes might follow strict practices regarding kitchen purity—follow the host's lead. Respect nature by not littering and adhering to sustainable tourism practices. When participating in local festivals, observe before joining in. Drinking alcohol is prohibited near many religious sites. The diverse region has different customs between Garhwal and Kumaon areas; local guides can provide specific guidance for each region you visit.",
  },
  {
    id: "q19",
    question: "What are the shopping opportunities in Uttarakhand?",
    answer:
      "Uttarakhand offers diverse shopping experiences for authentic local products. Woolen items are popular, including Pashmina shawls, Angora products from Uttarkashi, and colorful hand-knitted sweaters, caps, and socks. Traditional copper utensils known as 'Tamta' make unique souvenirs, particularly from Almora. Wooden crafts from Kumaon feature intricate carvings on masks, walking sticks, and decorative items. Local food products worth purchasing include pine honey, Rhododendron (Buransh) juice, various pickles, Kumaoni spices, and local millets. Pahadi paintings depicting religious themes and miniature art styles are available in cultural centers. For shopping destinations, visit Mall Road in Mussoorie and Nainital, Tibetan Market in Dehradun, Gandhi Road in Rishikesh, and state government emporiums in major towns for certified authentic crafts. Village haats (weekly markets) offer genuine local products at better prices, although bargaining is expected in most non-fixed price shops.",
  },
  {
    id: "q20",
    question:
      "How is the mobile connectivity and internet access throughout Uttarakhand?",
    answer:
      "Mobile connectivity and internet access vary significantly across Uttarakhand. Major towns like Dehradun, Haridwar, Rishikesh, Mussoorie, and Nainital have reliable 4G coverage from all major Indian telecom providers (Jio, Airtel, Vi, BSNL). Popular tourist destinations generally maintain steady connectivity. However, in remote areas, mountainous regions, and deep valleys, network coverage becomes limited or non-existent. BSNL typically has the widest coverage in remote areas, though signal strength may be inconsistent. During the Char Dham pilgrimage routes, connectivity is available at major stops but may disappear between locations. High-altitude trekking routes often have no connectivity for days. Internet cafes exist in larger towns, and most hotels and restaurants in tourist areas offer Wi-Fi, though speed may be slower than urban standards. For critical communication needs during remote travel, consider renting satellite phones where legally permitted. It's advisable to download offline maps, complete important communications before heading to remote areas, and inform family or friends about potential communication blackout periods.",
  },
];

const AIChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const popupRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatMessages");

      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages).map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
          setMessages(parsedMessages);
        } catch (error) {
          console.error("Error parsing saved messages:", error);
          initializeDefaultMessage();
        }
      } else {
        initializeDefaultMessage();
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const initializeDefaultMessage = () => {
    setMessages([
      {
        type: "bot",
        content:
          "Hello! I'm your Uttarakhand travel assistant. How can I help with your trip planning?",
        timestamp: new Date(),
      },
    ]);
  };

  useEffect(() => {
    if (messages.length > 0 && typeof window !== "undefined") {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (chatInputRef.current) {
        chatInputRef.current.focus();
      }
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuestionSelect = (questionId) => {
    const selectedQA = PREDEFINED_QA.find((qa) => qa.id === questionId);

    if (selectedQA) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "user",
          content: selectedQA.question,
          timestamp: new Date(),
        },
      ]);

      setIsTyping(true);
      setShowSuggestions(false);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            content: selectedQA.answer,
            timestamp: new Date(),
          },
        ]);
        setShowSuggestions(true);
      }, 1500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "user",
        content: inputValue,
        timestamp: new Date(),
      },
    ]);

    setInputValue("");
    setIsTyping(true);
    setShowSuggestions(false);

    const userQuestion = inputValue.toLowerCase();
    const matchedQA = PREDEFINED_QA.find(
      (qa) =>
        qa.question.toLowerCase().includes(userQuestion) ||
        userQuestion.includes(qa.question.toLowerCase().split("?")[0])
    );

    setTimeout(() => {
      setIsTyping(false);

      if (matchedQA) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            content: matchedQA.answer,
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            content:
              "I don't have specific information about that. Please try asking about Uttarakhand's destinations, how to reach there, best time to visit, trekking routes, budget planning, accommodation, local cuisine, or what to pack.",
            timestamp: new Date(),
          },
        ]);
      }
      setShowSuggestions(true);
    }, 1500);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleClearChat = () => {
    localStorage.removeItem("chatMessages");
    initializeDefaultMessage();
  };

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  useEffect(() => {
    if (!isOpen) {
      localStorage.removeItem("chatMessages");
      initializeDefaultMessage();
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-14 sm:bottom-6 sm:right-16 bg-[#205781] text-white rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 z-10 flex items-center space-x-1 sm:space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <span className="hidden sm:inline">Query</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div
            ref={popupRef}
            className="flex flex-col w-full h-full sm:h-[90vh] md:w-[85vw] lg:w-[75vw] xl:w-[65vw] bg-gray-50 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden animate-fadeIn"
          >
            <div className="bg-[#205781] text-white p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center mr-2 sm:mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="font-bold text-base sm:text-lg">
                    Uttarakhand Travel Assistant
                  </h2>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleClearChat}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md transition-colors"
                >
                  Clear Chat
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white/10 hover:bg-white/20 text-white p-1 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-100">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex mb-3 sm:mb-4 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.type === "bot" && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#205781] flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] sm:max-w-[75%] rounded-2xl px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base ${
                      message.type === "user"
                        ? "bg-[#205781] text-white rounded-tr-none"
                        : "bg-white text-gray-800 rounded-tl-none"
                    }`}
                  >
                    <p className="break-words">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === "user"
                          ? "text-white/70"
                          : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.type === "user" && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex mb-3 sm:mb-4 justify-start">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none px-3 py-2 sm:px-4 sm:py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-white border-t border-gray-200">
              <div className="p-2 sm:p-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-600">
                    Suggested questions:
                  </h3>
                  <button
                    onClick={toggleSuggestions}
                    className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm flex items-center"
                  >
                    {showSuggestions ? (
                      <>
                        Hide
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        Show
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                {showSuggestions && (
                  <div className="mt-2 flex flex-wrap gap-1 sm:gap-2 max-h-20 sm:max-h-24 overflow-y-auto">
                    {PREDEFINED_QA.map((qa) => (
                      <button
                        key={qa.id}
                        onClick={() => handleQuestionSelect(qa.id)}
                        className="text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full whitespace-nowrap"
                      >
                        {qa.question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatPopup; 
