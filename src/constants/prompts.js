export const PROMPTS = [
  {
    key: "concerns",
    mainBtn: {
      key: "I'm concerned...",
      value: "I'm concerned that ",
      tooltip: "Share a concern causing stress, worry, or low mood. (They’re going to share with you, too)"
    },
    response: {
      key: "concernsResponse",
      mainBtn: {
        key: "Respond to concerns...",
        value: "",
        tooltip: "Summarize your chat buddy's concerns in your own words"
      },
      btns: [
        {key: "I hear...", value: "I hear that "},
        {key: "I feel (about your situation)...", value: "I feel "},
        {key: "You're saying...", value: "You're saying that "},
        {key: "I wish...", value: "I wish that "}
      ]
    }
  },
  {
    key: "wants",
    mainBtn: {
      key: "I want to feel...",
      value: "I want to feel ",
      tooltip: "Describe the one feeling you most want in this situation. (You can add more later)",
      tail: "because ",
      search: ""
    },
    btns: [
      { key: "Add my own", value: "", editable: "custom"},
      { key: "Amused", value: "amused " },
      { key: "Appreciated", value: "appreciated " },
      { key: "Aware", value: "aware " },
      { key: "Cheerful", value: "cheerful " },
      { key: "Confident", value: "confident " },
      { key: "Content", value: "content " },
      { key: "Creative", value: "creative " },
      { key: "Daring", value: "daring " },
      { key: "Discerning", value: "discerning " },
      { key: "Energetic", value: "energetic " },
      { key: "Excited", value: "excited " },
      { key: "Fascinated", value: "fascinated " },
      { key: "Hopeful", value: "hopeful " },
      { key: "Important", value: "important " },
      { key: "Intimate", value: "intimate " },
      { key: "Joyful", value: "joyful " },
      { key: "Loving", value: "loving " },
      { key: "Nurturing", value: "nurturing " },
      { key: "Optimistic", value: "optimistic " },
      { key: "Peaceful", value: "peaceful " },
      { key: "Pensive", value: "pensive " },
      { key: "Playful", value: "playful " },
      { key: "Powerful", value: "powerful " },
      { key: "Proud", value: "proud " },
      { key: "Relaxed", value: "relaxed " },
      { key: "Respected", value: "respected " },
      { key: "Responsive", value: "responsive " },
      { key: "Secure", value: "secure " },
      { key: "Sensuous", value: "sensuous " },
      { key: "Serene", value: "serene " },
      { key: "Successful", value: "successful " },
      { key: "Thankful", value: "thankful " },
      { key: "Thoughtful", value: "thoughtful " },
      { key: "Trusting", value: "trusting " },
      { key: "Valuable", value: "valuable " },
      { key: "Worthwhile", value: "worthwhile " }
    ],
    double: {
      key: "wantsDouble",
      mainBtn: {
        key: "Add a feeling",
        value: "I also want to feel ",
        tooltip: "Add feelings you want to have.",
        search: ""
      },
      btns: [
        { key: "Add my own", value: "", editable: "custom"},
        { key: "Amused", value: "amused " },
        { key: "Appreciated", value: "appreciated " },
        { key: "Aware", value: "aware " },
        { key: "Cheerful", value: "cheerful " },
        { key: "Confident", value: "confident " },
        { key: "Content", value: "content " },
        { key: "Creative", value: "creative " },
        { key: "Daring", value: "daring " },
        { key: "Discerning", value: "discerning " },
        { key: "Energetic", value: "energetic " },
        { key: "Excited", value: "excited " },
        { key: "Fascinated", value: "fascinated " },
        { key: "Hopeful", value: "hopeful " },
        { key: "Important", value: "important " },
        { key: "Intimate", value: "intimate " },
        { key: "Joyful", value: "joyful " },
        { key: "Loving", value: "loving " },
        { key: "Nurturing", value: "nurturing " },
        { key: "Optimistic", value: "optimistic " },
        { key: "Peaceful", value: "peaceful " },
        { key: "Pensive", value: "pensive " },
        { key: "Playful", value: "playful " },
        { key: "Powerful", value: "powerful " },
        { key: "Proud", value: "proud " },
        { key: "Relaxed", value: "relaxed " },
        { key: "Respected", value: "respected " },
        { key: "Responsive", value: "responsive " },
        { key: "Secure", value: "secure " },
        { key: "Sensuous", value: "sensuous " },
        { key: "Serene", value: "serene " },
        { key: "Successful", value: "successful " },
        { key: "Thankful", value: "thankful " },
        { key: "Thoughtful", value: "thoughtful " },
        { key: "Trusting", value: "trusting " },
        { key: "Valuable", value: "valuable " },
        { key: "Worthwhile", value: "worthwhile " }
      ]
    },
    response: {
      key: "wantsResponse",
      mainBtn: {
        key: "Respond to wants...",
        value: "",
        tooltip: "Summarize your chat buddy's wants in your own words"
      },
      btns: [
        {key: "I hear...", value: "I hear that "},
        {key: "I feel (about your situation)...", value: "I feel "},
        {key: "You're saying...", value: "You're saying that "},
        {key: "I wish...", value: "I wish that "}
      ]
    }
  },
  {
    key: "thinking",
    mainBtn: {
      key: "I'm thinking...",
      value: "I'm thinking ",
      tooltip: "Share a thought or worry you have about your situation.",
      tail: "that "
    },
    btns: [
      {
        key: "Add my own",
        value: "",
        editable: "custom"
      },
      {
        key: "About me",
        value: "(about me) ",
      },
      {
        key: "About the situation",
        value: "(about the situation) ",
      },
      {
        key: "About them",
        value: "(about them) ",
      }
    ]
  },
  { 
    key: "thoughts",
    mainBtn: {
      key: "My thought is...",
      tooltip: "Choose a type of thought that fits for your state of mind.",
      tail: "fits because "
    },
    btns: [
      {
        key: "Add my own",
        value: "",
        tooltip: "",
        editable: "custom"
      },
      {
        key: "An all or nothing thought:",
        value: "an all or nothing thought ",
        tooltip: "Simplifying into two extremes (e.g. either all good/all bad)"
      },
      {
        key: "A blaming thought:",
        value: "a blaming thought ",
        tooltip: "Faulting a single source for all the trouble"
      },
      {
        key: "A mind reading thought:",
        value: "a mind reading thought ",
        tooltip: "Assuming you know people’s reasons or judgments"
      },
      {
        key: "An overgeneralizing thought:",
        value: "an overgeneralizing thought ",
        tooltip: "Thinking all incidents will be exactly like the one incident"
      },
      {
        key: "A personalizing thought:",
        value: "a personalizing thought ",
        tooltip: "Thinking a bad outcome results from a bad in you"
      },
      {
        key: "A worst case scenario thought:",
        value: "a worst case scenario thought ",
        tooltip: "Believing the worst is going to happen"
      }
    ],
    double: {
      key: "thoughtsDouble",
      mainBtn: {
        key: "Add a thought",
        value: "I’m also having ",
        tooltip: "Add types of thoughts that fit.",
        tail: "because "
      },
      btns: [
        {
          key: "Add my own",
          value: "",
          tooltip: "",
          editable: "custom"
        },
        {
          key: "An all or nothing thought:",
          value: "an all or nothing thought ",
          tooltip: "Simplifying into two extremes (e.g. either all good/all bad)"
        },
        {
          key: "A blaming thought:",
          value: "a blaming thought ",
          tooltip: "Faulting a single source for all the trouble"
        },
        {
          key: "A mind reading thought:",
          value: "a mind reading thought ",
          tooltip: "Assuming you know people’s reasons or judgments"
        },
        {
          key: "An overgeneralizing thought:",
          value: "an overgeneralizing thought ",
          tooltip: "Thinking all incidents will be exactly like the one incident"
        },
        {
          key: "A personalizing thought:",
          value: "a personalizing thought ",
          tooltip: "Thinking a bad outcome results from a bad in you"
        },
        {
          key: "A worst case scenario thought:",
          value: "a worst case scenario thought ",
          tooltip: "Believing the worst is going to happen"
        }
      ]
    },
    response: {
      key: "thoughtsResponse",
      mainBtn: {
        key: "Respond to thoughts...",
        value: "",
        tooltip: "Summarize your chat buddy's thoughts in your own words"
      },
      btns: [
        {key: "I hear...", value: "I hear that "},
        {key: "I feel (about your situation)...", value: "I feel "},
        {key: "You're saying...", value: "You're saying that "},
        {key: "I wish...", value: "I wish that "}
      ]
    }
  },
  {
    key: "feelings",
    mainBtn: {
      key: "My feeling is...",
      value: "Feeling ", 
      tooltip: "Choose the feeling that's troubling you most. (You can add more later)",
      tail: "troubles me most because ",
      search: ""
    },
    btns: [
      { key: "Add my own", value: "", editable: "custom"},
      { key: "Angry", value: "angry " },
      { key: "Anxious", value: "anxious " },
      { key: "Apathetic", value: "apathetic " },
      { key: "Ashamed", value: "ashamed " },
      { key: "Bewildered", value: "bewildered " },
      { key: "Bored", value: "bored " },
      { key: "Confused", value: "confused " },
      { key: "Critical", value: "critical " },
      { key: "Depressed", value: "depressed " },
      { key: "Discouraged", value: "discouraged " },
      { key: "Distant", value: "distant " },
      { key: "Embarrassed", value: "embarrassed " },
      { key: "Frustrated", value: "frustrated " },
      { key: "Guilty", value: "guilty " },
      { key: "Hateful", value: "hateful " },
      { key: "Helpless", value: "helpless " },
      { key: "Hostile", value: "hostile " },
      { key: "Hurt", value: "hurt " },
      { key: "Inadequate", value: "inadequate " },
      { key: "Inferior", value: "inferior " },
      { key: "Insecure", value: "insecure " },
      { key: "Insignificant", value: "insignificant " },
      { key: "Irritated", value: "irritated " },
      { key: "Isolated", value: "isolated " },
      { key: "Jealous", value: "jealous " },
      { key: "Lonely", value: "lonely " },
      { key: "Mad", value: "mad " },
      { key: "Overwhelmed", value: "overwhelmed " },
      { key: "Rejected", value: "rejected " },
      { key: "Remorseful", value: "remorseful " },
      { key: "Sad", value: "sad " },
      { key: "Sarcastic", value: "sarcastic " },
      { key: "Scared", value: "scared " },
      { key: "Selfish", value: "selfish " },
      { key: "Sleepy", value: "sleepy " },
      { key: "Stupid", value: "stupid " },
      { key: "Submissive", value: "submissive " },
      { key: "Tired", value: "tired " }
    ],
    double: {
      key: "feelingsDouble",
      mainBtn: {
        key: "Add a feeling",
        value: "I'm also feeling ",
        tooltip: "Add feelings you're having",
        search: ""
      },
      btns: [
        { key: "Add my own", value: "", editable: "custom"},
        { key: "Angry", value: "angry " },
        { key: "Anxious", value: "anxious " },
        { key: "Apathetic", value: "apathetic " },
        { key: "Ashamed", value: "ashamed " },
        { key: "Bewildered", value: "bewildered " },
        { key: "Bored", value: "bored " },
        { key: "Confused", value: "confused " },
        { key: "Critical", value: "critical " },
        { key: "Depressed", value: "depressed " },
        { key: "Discouraged", value: "discouraged " },
        { key: "Distant", value: "distant " },
        { key: "Embarrassed", value: "embarrassed " },
        { key: "Frustrated", value: "frustrated " },
        { key: "Guilty", value: "guilty " },
        { key: "Hateful", value: "hateful " },
        { key: "Helpless", value: "helpless " },
        { key: "Hostile", value: "hostile " },
        { key: "Hurt", value: "hurt " },
        { key: "Inadequate", value: "inadequate " },
        { key: "Inferior", value: "inferior " },
        { key: "Insecure", value: "insecure " },
        { key: "Insignificant", value: "insignificant " },
        { key: "Irritated", value: "irritated " },
        { key: "Isolated", value: "isolated " },
        { key: "Jealous", value: "jealous " },
        { key: "Lonely", value: "lonely " },
        { key: "Mad", value: "mad " },
        { key: "Overwhelmed", value: "overwhelmed " },
        { key: "Rejected", value: "rejected " },
        { key: "Remorseful", value: "remorseful " },
        { key: "Sad", value: "sad " },
        { key: "Sarcastic", value: "sarcastic " },
        { key: "Scared", value: "scared " },
        { key: "Selfish", value: "selfish " },
        { key: "Sleepy", value: "sleepy " },
        { key: "Stupid", value: "stupid " },
        { key: "Submissive", value: "submissive " },
        { key: "Tired", value: "tired " }
      ] 
    },
    response: {
      key: "feelingsResponse",
      mainBtn: {
        key: "Respond to feelings...",
        value: "",
        tooltip: "Summarize your chat buddy's feelings in your own words"
      },
      btns: [
        {key: "I hear...", value: "I hear that "},
        {key: "I feel (about your situation)...", value: "I feel "},
        {key: "You're saying...", value: "You're saying that "},
        {key: "I wish...", value: "I wish that "}
      ]
    }
  },
  {
    key: "suggestions",
    mainBtn: {
      key: "I'd try...",
      value: "I'd try (in your situation) ",
      tooltip: "Share some ideas with your chat partner"
    },
    btns: [
      {
        key: "Add my own",
        value: "",
        editable: "custom"
      },
      {
        key: "Positive/hopeful thought",
        value: "positive/hopeful thought of ",
      },
      {
        key: "Reaching out to allies",
        value: "reaching out to allies who ",
      },
      {
        key: "A new action",
        value: "a new action of ",
      },
      {
        key: "Self-care",
        value: "self-care by ",
      }
    ]
  },
  {
    key: "strategies",
    mainBtn: {
      key: "I'll try...",
      value: "I'll try ",
      tooltip: "Choose a strategy to try as a next step"
    },
    btns: [
      {
        key: "Add my own",
        value: "",
        tooltip: "",
        editable: "custom"
      },
      {
        key: "An action strategy:",
        value: "an action strategy of ",
        tooltip: "A plan, behavior, timeline, or difference in your body"
      },
      {
        key: "A mindful strategy:",
        value: "a mindful strategy of ",
        tooltip: "A new thought, reflection, or state of mind"
      },
      {
        key: "A social strategy:",
        value: "a social strategy of ",
        tooltip: "Reaching out to supportive people, or changing your social scene"
      }
    ]
  },
  {
    key: "closer",
    mainBtn: {
      key: "Thank you!",
      value: "Thank you! ",
      tooltip: "Thank your chat buddy and encourage them :)"
    }
  }
];
