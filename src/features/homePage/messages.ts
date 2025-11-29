const welcomeMessages = [
    "Good to see you — let's skate.",
    "Time to ride. Keep it steady.",
    "Park's waiting. Roll out.",
    "Keep your wheels warm.",
    "Lines to run. Go get 'em.",
    "Settle in and skate smooth.",
    "Board's ready. You in?",
    "Keep it clean, land it solid.",
    "Fresh pavement, fresh tricks.",
    "Let's put in a session.",
];

export const getRandomWelcomeMessage = (): string => {
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
};