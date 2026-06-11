import React, { useState, useEffect } from 'react';
import { Shuffle, Settings, Heart, Brain, Sun, Clock, Eye, Moon, Users, Sparkles, Info } from 'lucide-react';

const ResonancesApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedEdition, setSelectedEdition] = useState('Original');
  const [intensityMode, setIntensityMode] = useState(false);
  const [gentleMode, setGentleMode] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [showDyadInstructions, setShowDyadInstructions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Base de données complète des questions
  const allQuestions = [
    // ÉDITION ORIGINAL
    { question: "Raconte-moi la dernière fois où tu as ri aux éclats.", edition: "Original", categorie: "Émotions", intensity: false },
    { question: "Si tu pouvais changer une chose dans le monde, ce serait quoi ?", edition: "Original", categorie: "Valeurs", intensity: false },
    { question: "Quel est ton super-pouvoir secret ?", edition: "Original", categorie: "Identité", intensity: false },
    { question: "Si tu étais un animal, lequel serais-tu et pourquoi ?", edition: "Original", categorie: "Personnalité", intensity: false },
    { question: "Quelle est la chose la plus folle que tu aies jamais faite ?", edition: "Original", categorie: "Aventure", intensity: false },
    { question: "Quel est ton plus beau souvenir d'enfance ?", edition: "Original", categorie: "Souvenirs", intensity: false },
    { question: "Si tu pouvais avoir un super-pouvoir, lequel choisirais-tu ?", edition: "Original", categorie: "Fantaisie", intensity: false },
    { question: "Quelle est la leçon la plus importante que la vie t'ait enseignée ?", edition: "Original", categorie: "Sagesse", intensity: false },
    { question: "Quel est le compliment le plus marquant qu'on t'ait fait ?", edition: "Original", categorie: "Estime de soi", intensity: false },
    { question: "Raconte-moi une peur que tu as dépassée.", edition: "Original", categorie: "Courage", intensity: false },
    { question: "Si tu pouvais revivre une journée de ta vie, laquelle choisirais-tu ?", edition: "Original", categorie: "Souvenirs", intensity: false },
    { question: "Quelle est la chose la plus spontanée que tu aies jamais faite ?", edition: "Original", categorie: "Aventure", intensity: false },
    { question: "Quel livre, film ou chanson a changé ta vision de la vie ?", edition: "Original", categorie: "Influence", intensity: false },
    { question: "Quelle tradition familiale te tient le plus à cœur ?", edition: "Original", categorie: "Famille", intensity: false },
    { question: "Quel conseil donnerais-tu à ton moi d'il y a 10 ans ?", edition: "Original", categorie: "Sagesse", intensity: false },
    { question: "Quelle est la chose la plus courageuse que tu aies jamais faite ?", edition: "Original", categorie: "Courage", intensity: false },
    { question: "Si tu pouvais voyager dans le temps, à quelle époque irais-tu ?", edition: "Original", categorie: "Histoire", intensity: false },
    { question: "Quelle est la plus belle surprise qu'on t'ait faite ?", edition: "Original", categorie: "Joie", intensity: false },
    { question: "Quel endroit sur Terre rêves-tu de visiter ?", edition: "Original", categorie: "Voyage", intensity: false },
    { question: "Quel talent secret aimerais-tu développer ?", edition: "Original", categorie: "Potentiel", intensity: false },
    { question: "Quelle qualité admires-tu le plus chez tes amis ?", edition: "Original", categorie: "Amitié", intensity: false },
    { question: "Si tu écrivais un livre, de quoi parlerait-il ?", edition: "Original", categorie: "Créativité", intensity: false },
    { question: "Quel est ton rituel réconfortant quand tu vas mal ?", edition: "Original", categorie: "Réconfort", intensity: false },
    { question: "Quelle expérience t'a le plus marqué cette année ?", edition: "Original", categorie: "Marquant", intensity: false },
    { question: "Si tu pouvais dîner avec une personne, qui choisirais-tu ?", edition: "Original", categorie: "Inspiration", intensity: false },
    { question: "Si tu pouvais maîtriser une compétence instantanément, laquelle ?", edition: "Original", categorie: "Aspirations", intensity: false },
    { question: "Quel moment de ta vie aimerais-tu revivre encore et encore ?", edition: "Original", categorie: "Bonheur", intensity: false },
    { question: "Si tu pouvais être invisible pendant une journée, que ferais-tu ?", edition: "Original", categorie: "Curiosité", intensity: false },
    { question: "Quelle est ta plus grande fierté personnelle ?", edition: "Original", categorie: "Accomplissement", intensity: false },
    { question: "Quel type de personnalité t'attire le plus chez les autres ?", edition: "Original", categorie: "Relations", intensity: false },
    { question: "Si tu pouvais résoudre un mystère historique, lequel ?", edition: "Original", categorie: "Mystère", intensity: false },
    { question: "Si tu pouvais éliminer une chose négative du monde, laquelle ?", edition: "Original", categorie: "Idéal", intensity: false },
    { question: "Si tu pouvais créer une nouvelle fête, elle célébrerait quoi ?", edition: "Original", categorie: "Célébration", intensity: false },
    { question: "Quel est le plus beau cadeau que tu aies jamais reçu ?", edition: "Original", categorie: "Cadeaux", intensity: false },
    { question: "Quel moment de ta journée préfères-tu le plus ?", edition: "Original", categorie: "Routine", intensity: false },
    { question: "Quelle odeur te ramène instantanément à ton enfance ?", edition: "Original", categorie: "Sens", intensity: false },
    { question: "Quel objet dans ta maison a le plus de valeur sentimentale ?", edition: "Original", categorie: "Objets", intensity: false },
    { question: "Quel trait de caractère aimerais-tu développer davantage ?", edition: "Original", categorie: "Développement", intensity: false },
    { question: "Quelle habitude de ton enfance gardes-tu encore ?", edition: "Original", categorie: "Habitudes", intensity: false },
    { question: "Si tu pouvais envoyer un message au monde entier, que dirais-tu ?", edition: "Original", categorie: "Message", intensity: false },
    { question: "Quel aspect de ta personnalité surprend le plus les gens ?", edition: "Original", categorie: "Surprise", intensity: false },
    { question: "Quel rêve d'enfant as-tu abandonné, et pourquoi ?", edition: "Original", categorie: "Rêves", intensity: true },
    { question: "Raconte-moi un moment où tu t'es senti vraiment vulnérable.", edition: "Original", categorie: "Vulnérabilité", intensity: true },
    { question: "Si tu mourais demain, quel serait ton plus grand regret ?", edition: "Original", categorie: "Regrets", intensity: true },
    { question: "Quelle est la chose la plus difficile que tu aies eu à pardonner ?", edition: "Original", categorie: "Pardon", intensity: true },
    { question: "Quelle partie de toi-même caches-tu le plus aux autres ?", edition: "Original", categorie: "Authenticité", intensity: true },
    { question: "De quoi as-tu le plus honte dans ta vie ?", edition: "Original", categorie: "Honte", intensity: true },
    { question: "Quelle relation as-tu le plus regretté d'avoir perdue ?", edition: "Original", categorie: "Perte", intensity: true },
    { question: "À quel moment as-tu eu le plus peur de toi-même ?", edition: "Original", categorie: "Peur de soi", intensity: true },

    // ÉDITION OPTIMISTE
    { question: "Quelle est la meilleure nouvelle que tu aies reçue cette année ?", edition: "Optimiste", categorie: "Joie", intensity: false },
    { question: "Raconte-moi quelque chose qui t'inspire en ce moment.", edition: "Optimiste", categorie: "Inspiration", intensity: false },
    { question: "Quel petit plaisir de la vie te rend toujours heureux ?", edition: "Optimiste", categorie: "Bonheur", intensity: false },
    { question: "Quelle est la chose la plus gentille qu'on ait faite pour toi ?", edition: "Optimiste", categorie: "Gentillesse", intensity: false },
    { question: "Raconte-moi un moment où tu as aidé quelqu'un.", edition: "Optimiste", categorie: "Altruisme", intensity: false },
    { question: "Quel est ton plus beau projet en cours ?", edition: "Optimiste", categorie: "Projets", intensity: false },
    { question: "Quelle habitude positive as-tu développée cette année ?", edition: "Optimiste", categorie: "Développement", intensity: false },
    { question: "Raconte-moi une coïncidence magique qui t'est arrivée.", edition: "Optimiste", categorie: "Magie", intensity: false },
    { question: "Quel est ton endroit préféré pour te ressourcer ?", edition: "Optimiste", categorie: "Bien-être", intensity: false },
    { question: "Quelle découverte récente t'a rempli de joie ?", edition: "Optimiste", categorie: "Découverte", intensity: false },
    { question: "Si tu pouvais offrir un cadeau à l'humanité, ce serait quoi ?", edition: "Optimiste", categorie: "Générosité", intensity: false },
    { question: "Raconte-moi une tradition que tu aimerais créer.", edition: "Optimiste", categorie: "Créativité", intensity: false },
    { question: "Quel changement positif vois-tu dans le monde actuellement ?", edition: "Optimiste", categorie: "Espoir", intensity: false },
    { question: "Quelle expérience récente t'a rendu reconnaissant ?", edition: "Optimiste", categorie: "Gratitude", intensity: false },
    { question: "Quel rêve aimerais-tu réaliser dans les prochaines années ?", edition: "Optimiste", categorie: "Rêves", intensity: false },
    { question: "Si tu pouvais envoyer un message d'espoir à ton moi du passé, que dirais-tu ?", edition: "Optimiste", categorie: "Sagesse", intensity: false },
    { question: "Quelle qualité chez toi s'est le plus développée récemment ?", edition: "Optimiste", categorie: "Évolution", intensity: false },
    { question: "Quel moment de pure joie as-tu vécu récemment ?", edition: "Optimiste", categorie: "Bonheur", intensity: false },
    { question: "Quelle personne a eu l'impact le plus positif sur ta vie ?", edition: "Optimiste", categorie: "Influence", intensity: false },
    { question: "Quel compliment aimerais-tu recevoir plus souvent ?", edition: "Optimiste", categorie: "Reconnaissance", intensity: false },
    { question: "Quelle activité te met instantanément de bonne humeur ?", edition: "Optimiste", categorie: "Humeur", intensity: false },
    { question: "Quel petit geste quotidien te rend heureux ?", edition: "Optimiste", categorie: "Simplicité", intensity: false },
    { question: "Quelle réussite récente te rend particulièrement fier ?", edition: "Optimiste", categorie: "Fierté", intensity: false },
    { question: "Si tu pouvais créer un mouvement positif, lequel ?", edition: "Optimiste", categorie: "Impact", intensity: false },
    { question: "Quelle leçon positive as-tu tirée d'une expérience difficile ?", edition: "Optimiste", categorie: "Résilience", intensity: false },
    { question: "Quel aspect de la nature te remplit le plus d'émerveillement ?", edition: "Optimiste", categorie: "Nature", intensity: false },
    { question: "Quelle innovation récente te donne espoir pour l'avenir ?", edition: "Optimiste", categorie: "Innovation", intensity: false },
    { question: "Quel acte de bonté as-tu posé récemment ?", edition: "Optimiste", categorie: "Bonté", intensity: false },
    { question: "Quelle belle surprise t'est-il arrivé cette semaine ?", edition: "Optimiste", categorie: "Surprise", intensity: false },
    { question: "Quel progrès personnel célèbres-tu en ce moment ?", edition: "Optimiste", categorie: "Progrès", intensity: false },

    // ÉDITION SEXUALITÉ
    { question: "Comment as-tu découvert ta sexualité pour la première fois ?", edition: "Sexualité", categorie: "Éveil", intensity: false },
    { question: "Quelle est ta relation à ton corps nu devant un miroir ?", edition: "Sexualité", categorie: "Image corporelle", intensity: false },
    { question: "Comment définis-tu l'intimité au-delà du sexe ?", edition: "Sexualité", categorie: "Intimité", intensity: false },
    { question: "Quelle partie de ton corps aimes-tu le plus, et pourquoi ?", edition: "Sexualité", categorie: "Acceptation corporelle", intensity: false },
    { question: "Comment ton éducation familiale a-t-elle influencé ta sexualité ?", edition: "Sexualité", categorie: "Influences", intensity: false },
    { question: "Quelle est ta conception d'une sexualité épanouie ?", edition: "Sexualité", categorie: "Épanouissement", intensity: false },
    { question: "Comment gères-tu le désir quand il est présent ou absent ?", edition: "Sexualité", categorie: "Désir", intensity: false },
    { question: "Quelle différence fais-tu entre amour et désir sexuel ?", edition: "Sexualité", categorie: "Distinction", intensity: false },
    { question: "Comment te sens-tu par rapport au plaisir en général ?", edition: "Sexualité", categorie: "Plaisir", intensity: false },
    { question: "Quel rôle joue la vulnérabilité dans ta sexualité ?", edition: "Sexualité", categorie: "Vulnérabilité", intensity: false },
    { question: "Comment exprimes-tu tes besoins intimes à un partenaire ?", edition: "Sexualité", categorie: "Communication", intensity: false },
    { question: "Quelle est ta relation aux tabous sexuels de la société ?", edition: "Sexualité", categorie: "Tabous", intensity: false },
    { question: "Comment ton rapport au pouvoir s'exprime-t-il dans l'intimité ?", edition: "Sexualité", categorie: "Pouvoir", intensity: false },
    { question: "Quelle est ta relation à la masturbation et à l'auto-exploration ?", edition: "Sexualité", categorie: "Auto-érotisme", intensity: false },
    { question: "Comment la tendresse trouve-t-elle sa place dans ta sexualité ?", edition: "Sexualité", categorie: "Tendresse", intensity: false },
    { question: "Quel lien fais-tu entre sexualité et spiritualité ?", edition: "Sexualité", categorie: "Spiritualité", intensity: false },
    { question: "Comment ton cycle naturel influence-t-il ta libido ?", edition: "Sexualité", categorie: "Cycles", intensity: false },
    { question: "Quelle place accordes-tu au jeu et à la créativité sexuelle ?", edition: "Sexualité", categorie: "Créativité", intensity: false },
    { question: "Comment navigues-tu entre désir spontané et sexualité programmée ?", edition: "Sexualité", categorie: "Spontanéité", intensity: false },
    { question: "Quel impact les médias ont-ils eu sur ta perception de la sexualité ?", edition: "Sexualité", categorie: "Influences médiatiques", intensity: false },
    { question: "Quelle blessure sexuelle ou intime portes-tu encore ?", edition: "Sexualité", categorie: "Blessures", intensity: true },
    { question: "Quel fantasme t'excite le plus, et que révèle-t-il de toi ?", edition: "Sexualité", categorie: "Fantasmes", intensity: true },
    { question: "De quoi as-tu le plus honte dans ta sexualité ?", edition: "Sexualité", categorie: "Honte", intensity: true },
    { question: "Comment ton rapport à la domination ou à la soumission se manifeste-t-il ?", edition: "Sexualité", categorie: "Dynamiques de pouvoir", intensity: true },
    { question: "Quelle expérience sexuelle t'a le plus marqué positivement ?", edition: "Sexualité", categorie: "Expériences marquantes", intensity: true },
    { question: "Comment ton enfant intérieur influence-t-il ta sexualité adulte ?", edition: "Sexualité", categorie: "Psychanalyse", intensity: true },
    { question: "Quel désir sexuel n'oses-tu pas avouer, même à toi-même ?", edition: "Sexualité", categorie: "Désirs cachés", intensity: true },
    { question: "Comment la peur de l'abandon affecte-t-elle ton intimité ?", edition: "Sexualité", categorie: "Peurs", intensity: true },
    { question: "Quel schéma répétitif observes-tu dans tes relations intimes ?", edition: "Sexualité", categorie: "Schémas", intensity: true },
    { question: "Comment gères-tu la jalousie et la possessivité sexuelle ?", edition: "Sexualité", categorie: "Jalousie", intensity: true },
    { question: "Quelle part de toi juges-tu comme perverse ou déviante ?", edition: "Sexualité", categorie: "Jugement", intensity: true },
    { question: "Comment ton rapport à la mère ou au père influence-t-il tes attirances ?", edition: "Sexualité", categorie: "Complexes familiaux", intensity: true },
    { question: "Quel traumatisme sexuel ou intime continues-tu de porter ?", edition: "Sexualité", categorie: "Traumatismes", intensity: true },
    { question: "Comment la culpabilité s'immisce-t-elle dans ton plaisir ?", edition: "Sexualité", categorie: "Culpabilité", intensity: true },
    { question: "Quel aspect de ta sexualité réprimes-tu par peur du jugement ?", edition: "Sexualité", categorie: "Répression", intensity: true },
    { question: "Comment ton besoin de contrôle s'exprime-t-il dans l'intimité ?", edition: "Sexualité", categorie: "Contrôle", intensity: true },
    { question: "Quelle partie de toi se révèle uniquement dans l'acte sexuel ?", edition: "Sexualité", categorie: "Révélation", intensity: true },
    { question: "Comment la performance et l'ego interfèrent-ils avec ton plaisir ?", edition: "Sexualité", categorie: "Performance", intensity: true },
    { question: "Quel désir interdit de ton enfance influence encore ta sexualité ?", edition: "Sexualité", categorie: "Enfance", intensity: true },
    { question: "Comment ton rapport à la transgression nourrit-il ton érotisme ?", edition: "Sexualité", categorie: "Transgression", intensity: true },
    { question: "Quelle pulsion sexuelle te fait peur chez toi ?", edition: "Sexualité", categorie: "Pulsions", intensity: true },
    { question: "Comment ton besoin d'amour et de validation se mêle-t-il au sexe ?", edition: "Sexualité", categorie: "Besoins affectifs", intensity: true },
    { question: "Quel mensonge te racontes-tu sur ta propre sexualité ?", edition: "Sexualité", categorie: "Auto-déception", intensity: true },
    { question: "Comment l'idéal et la réalité de ta sexualité se confrontent-ils ?", edition: "Sexualité", categorie: "Idéal vs réalité", intensity: true },
    { question: "Quelle part d'animalité acceptes-tu ou rejettes-tu en toi sexuellement ?", edition: "Sexualité", categorie: "Animalité", intensity: true },

    // ÉDITION CONNEXION À SOI
    { question: "Comment te sens-tu dans ton corps en ce moment ?", edition: "Connexion à soi", categorie: "Sensation", intensity: false },
    { question: "Quelle sensation physique associes-tu au bonheur ?", edition: "Connexion à soi", categorie: "Sensation", intensity: false },
    { question: "Dans quelles parties de ton corps ressens-tu le stress ?", edition: "Connexion à soi", categorie: "Sensation", intensity: false },
    { question: "Quelle texture, odeur ou son te réconforte le plus ?", edition: "Connexion à soi", categorie: "Sensation", intensity: false },
    { question: "Comment ton corps réagit-il quand tu es amoureux ?", edition: "Connexion à soi", categorie: "Sensation", intensity: false },
    { question: "Quelle partie de ton corps négliges-tu le plus ?", edition: "Connexion à soi", categorie: "Sensation", intensity: false },
    { question: "Dans quels moments te sens-tu le plus connecté à ton corps ?", edition: "Connexion à soi", categorie: "Sensation", intensity: false },
    { question: "Quelle émotion as-tu du mal à exprimer ?", edition: "Connexion à soi", categorie: "Émotion", intensity: false },
    { question: "Raconte-moi un moment où tu as ressenti une joie pure.", edition: "Connexion à soi", categorie: "Émotion", intensity: false },
    { question: "Comment exprimes-tu ta colère ?", edition: "Connexion à soi", categorie: "Émotion", intensity: false },
    { question: "Quelle émotion te visite le plus souvent en ce moment ?", edition: "Connexion à soi", categorie: "Émotion", intensity: false },
    { question: "Comment ton enfant intérieur s'exprime-t-il ?", edition: "Connexion à soi", categorie: "Émotion", intensity: false },
    { question: "Quelle émotion as-tu appris à mieux accueillir récemment ?", edition: "Connexion à soi", categorie: "Émotion", intensity: false },
    { question: "Dans quels moments pleures-tu le plus facilement ?", edition: "Connexion à soi", categorie: "Émotion", intensity: false },
    { question: "Comment gères-tu la frustration ?", edition: "Connexion à soi", categorie: "Émotion", intensity: false },
    { question: "De quoi as-tu vraiment besoin en ce moment ?", edition: "Connexion à soi", categorie: "Besoin", intensity: false },
    { question: "Comment te nourris-tu émotionnellement ?", edition: "Connexion à soi", categorie: "Besoin", intensity: false },
    { question: "Quels sont tes besoins essentiels pour te sentir épanoui ?", edition: "Connexion à soi", categorie: "Besoin", intensity: false },
    { question: "De quel type de soutien as-tu le plus besoin ?", edition: "Connexion à soi", categorie: "Besoin", intensity: false },
    { question: "Comment honores-tu tes besoins profonds ?", edition: "Connexion à soi", categorie: "Besoin", intensity: false },
    { question: "Quel besoin négligé réclame ton attention ?", edition: "Connexion à soi", categorie: "Besoin", intensity: false },
    { question: "Comment exprimes-tu ta créativité ?", edition: "Connexion à soi", categorie: "Expression", intensity: false },
    { question: "De quelle façon aimes-tu montrer ton affection ?", edition: "Connexion à soi", categorie: "Expression", intensity: false },
    { question: "Comment exprimes-tu ton authenticité ?", edition: "Connexion à soi", categorie: "Expression", intensity: false },
    { question: "Quelle partie de toi as-tu du mal à exprimer ?", edition: "Connexion à soi", categorie: "Expression", intensity: false },
    { question: "Comment ta voix intérieure se manifeste-t-elle ?", edition: "Connexion à soi", categorie: "Expression", intensity: false },
    { question: "De quelle façon aimerais-tu mieux t'exprimer ?", edition: "Connexion à soi", categorie: "Expression", intensity: false },
    { question: "Cap ou pas cap de citer 7 besoins essentiels pour toi ?", edition: "Connexion à soi", categorie: "Besoin", intensity: true },
    { question: "Qu'est-ce qui te fait peur maintenant, ou te faisait peur dans ton enfance ?", edition: "Connexion à soi", categorie: "Émotion", intensity: true },
    { question: "À quelles personnes aimerais-tu dire « je t'aime » plus souvent ?", edition: "Connexion à soi", categorie: "Expression", intensity: true },
    { question: "Quels espaces te crées-tu chez toi pour te ressourcer ?", edition: "Connexion à soi", categorie: "Besoin", intensity: true },

    // ÉDITION ÉCOUTER SA BOUSSOLE
    { question: "Quel enseignement du passé te guide encore aujourd'hui ?", edition: "Écouter sa boussole", categorie: "Hier", intensity: false },
    { question: "Quelle expérience d'enfance a formé qui tu es aujourd'hui ?", edition: "Écouter sa boussole", categorie: "Hier", intensity: false },
    { question: "Quel moment de ton passé te remplit encore de fierté ?", edition: "Écouter sa boussole", categorie: "Hier", intensity: false },
    { question: "Quelle leçon as-tu tirée de ton plus grand échec ?", edition: "Écouter sa boussole", categorie: "Hier", intensity: false },
    { question: "Quel souvenir d'enfance te fait encore sourire ?", edition: "Écouter sa boussole", categorie: "Hier", intensity: false },
    { question: "Quelle version de toi du passé admires-tu le plus ?", edition: "Écouter sa boussole", categorie: "Hier", intensity: false },
    { question: "Quel héritage de tes ancêtres portes-tu fièrement ?", edition: "Écouter sa boussole", categorie: "Hier", intensity: false },
    { question: "Quelle tradition familiale as-tu envie de transmettre ?", edition: "Écouter sa boussole", categorie: "Hier", intensity: false },
    { question: "Comment prends-tu soin de toi au quotidien ?", edition: "Écouter sa boussole", categorie: "Aujourd'hui", intensity: false },
    { question: "Dans quels moments te sens-tu le plus toi-même ?", edition: "Écouter sa boussole", categorie: "Aujourd'hui", intensity: false },
    { question: "Que fais-tu quand tu as besoin de te reconnecter à toi ?", edition: "Écouter sa boussole", categorie: "Aujourd'hui", intensity: false },
    { question: "Comment gères-tu les moments difficiles ?", edition: "Écouter sa boussole", categorie: "Aujourd'hui", intensity: false },
    { question: "Quelle part de toi nourris-tu le mieux actuellement ?", edition: "Écouter sa boussole", categorie: "Aujourd'hui", intensity: false },
    { question: "Comment ton intuition te parle-t-elle ?", edition: "Écouter sa boussole", categorie: "Aujourd'hui", intensity: false },
    { question: "Quelles habitudes t'aident à rester centré ?", edition: "Écouter sa boussole", categorie: "Aujourd'hui", intensity: false },
    { question: "Dans quels domaines te sens-tu le plus en croissance ?", edition: "Écouter sa boussole", categorie: "Aujourd'hui", intensity: false },
    { question: "Quel petit pas veux-tu faire cette semaine pour tes rêves ?", edition: "Écouter sa boussole", categorie: "Demain", intensity: false },
    { question: "Comment vois-tu ta vie dans 5 ans ?", edition: "Écouter sa boussole", categorie: "Demain", intensity: false },
    { question: "Quelle nouvelle habitude aimerais-tu développer ?", edition: "Écouter sa boussole", categorie: "Demain", intensity: false },
    { question: "Quel héritage aimerais-tu laisser ?", edition: "Écouter sa boussole", categorie: "Demain", intensity: false },
    { question: "Quelle version de toi veux-tu devenir ?", edition: "Écouter sa boussole", categorie: "Demain", intensity: false },
    { question: "Quel défi t'attire et t'effraie à la fois ?", edition: "Écouter sa boussole", categorie: "Demain", intensity: false },
    { question: "Qu'aimerais-tu apprendre cette année ?", edition: "Écouter sa boussole", categorie: "Demain", intensity: false },
    { question: "Quel impact veux-tu avoir sur les autres ?", edition: "Écouter sa boussole", categorie: "Demain", intensity: false },
    { question: "Quelle expérience difficile t'a le plus appris sur toi ?", edition: "Écouter sa boussole", categorie: "Hier", intensity: true },
    { question: "Dans quels moments te sens-tu le plus aligné avec toi-même ?", edition: "Écouter sa boussole", categorie: "Aujourd'hui", intensity: true },
    { question: "Si tu suivais vraiment ton intuition, que changerais-tu ?", edition: "Écouter sa boussole", categorie: "Demain", intensity: true },
    { question: "Quel schéma répétitif aimerais-tu briser ?", edition: "Écouter sa boussole", categorie: "Aujourd'hui", intensity: true },
    { question: "Quelle peur t'empêche d'avancer vers tes rêves ?", edition: "Écouter sa boussole", categorie: "Demain", intensity: true },

    // ÉDITION CONNEXION (amorces à compléter)
    { question: "Ce que tes chaussures disent sur toi…", edition: "Connexion", categorie: "Échauffement", intensity: false },
    { question: "Mon jouet préféré d'enfant était…", edition: "Connexion", categorie: "Échauffement", intensity: false },
    { question: "Quelque chose en quoi je suis vraiment doué…", edition: "Connexion", categorie: "Identité", intensity: false },
    { question: "Une tradition de mon enfance qui compte encore pour moi…", edition: "Connexion", categorie: "Souvenirs", intensity: false },
    { question: "Mon souvenir d'enfance préféré…", edition: "Connexion", categorie: "Souvenirs", intensity: false },
    { question: "Ce que j'ai mangé le plus souvent au dîner pendant mon enfance…", edition: "Connexion", categorie: "Souvenirs", intensity: false },
    { question: "Si mes ex m'analysaient, ils diraient…", edition: "Connexion", categorie: "Perception", intensity: false },
    { question: "L'histoire de ma rencontre avec mon meilleur ami…", edition: "Connexion", categorie: "Relations", intensity: false },
    { question: "Ma première impression de toi était…", edition: "Connexion", categorie: "Perception", intensity: false },
    { question: "Une chose que la plupart des gens ne savent pas sur moi…", edition: "Connexion", categorie: "Identité", intensity: false },
    { question: "L'endroit où je vais pour être seul…", edition: "Connexion", categorie: "Introspection", intensity: false },
    { question: "Un livre que je relis sans cesse…", edition: "Connexion", categorie: "Influences", intensity: false },
    { question: "Quelque chose que j'aimerais que plus de gens comprennent sur moi…", edition: "Connexion", categorie: "Compréhension", intensity: false },
    { question: "Quelque chose que j'apprends encore sur moi-même…", edition: "Connexion", categorie: "Découverte", intensity: false },
    { question: "La dernière fois que j'ai pleuré…", edition: "Connexion", categorie: "Émotionnel", intensity: false },
    { question: "Quand je me sens soutenu, je me sens…", edition: "Connexion", categorie: "Soutien", intensity: false },
    { question: "La raison pour laquelle je suis en relation avec toi…", edition: "Connexion", categorie: "Relations", intensity: false },
    { question: "Ce que je pense que tu penses de moi…", edition: "Connexion", categorie: "Perception", intensity: false },
    { question: "Quelque chose que j'admire chez toi…", edition: "Connexion", categorie: "Appréciation", intensity: false },
    { question: "La façon dont je sabote mes relations…", edition: "Connexion", categorie: "Schémas", intensity: false },
    { question: "Ce qui me fait le plus peur dans l'amour…", edition: "Connexion", categorie: "Amour", intensity: false },
    { question: "Ce dont j'ai besoin de toi, mais que je ne sais pas comment demander…", edition: "Connexion", categorie: "Besoins", intensity: false },
    { question: "La façon dont je rends difficile, pour les autres, de m'aimer…", edition: "Connexion", categorie: "Vulnérabilité", intensity: false },
    { question: "Comment ton meilleur ami te décrirait-il en trois mots ?", edition: "Connexion", categorie: "Perception", intensity: false },
    { question: "Un moment déterminant de ma vie a été…", edition: "Connexion", categorie: "Transformation", intensity: true },
    { question: "Si c'était notre dernier jour sur Terre, je…", edition: "Connexion", categorie: "Priorités", intensity: true },
    { question: "Ma blessure non résolue la plus profonde…", edition: "Connexion", categorie: "Guérison", intensity: true },
    { question: "Quelque chose pour lequel je dois encore me pardonner…", edition: "Connexion", categorie: "Pardon", intensity: true },

    // ÉDITION SHADOW
    { question: "La limite la plus difficile à poser pour moi…", edition: "Shadow", categorie: "Limites", intensity: true },
    { question: "La partie de moi que je veux le moins que tu voies…", edition: "Shadow", categorie: "Ombre", intensity: true },
    { question: "Quand je suis à mon pire, je…", edition: "Shadow", categorie: "Ombre", intensity: true },
    { question: "Quelque chose que je juge sévèrement chez les autres…", edition: "Shadow", categorie: "Projection", intensity: true },
    { question: "Le mensonge que je me raconte le plus souvent…", edition: "Shadow", categorie: "Auto-déception", intensity: true },
    { question: "Un moment où j'ai trahi quelqu'un…", edition: "Shadow", categorie: "Trahison", intensity: true },
    { question: "Ce que j'espère que personne ne découvrira jamais sur moi…", edition: "Shadow", categorie: "Secrets", intensity: true },
    { question: "Une fois où j'ai laissé quelqu'un dépasser mes limites…", edition: "Shadow", categorie: "Limites", intensity: true },
    { question: "Ce que je désire profondément…", edition: "Shadow", categorie: "Désirs", intensity: true },
    { question: "La façon dont je complique aux autres de me donner ce que je veux…", edition: "Shadow", categorie: "Schémas", intensity: true },
    { question: "Quelles émotions ai-je le plus peur d'exprimer ?", edition: "Shadow", categorie: "Émotions", intensity: true },
    { question: "Que crains-je que les gens découvrent sur moi ?", edition: "Shadow", categorie: "Peurs", intensity: true },
    { question: "La façon dont je réagis quand je ressens de la colère…", edition: "Shadow", categorie: "Colère", intensity: true },
    { question: "Quelles croyances sur moi-même me limitent ou me sabotent ?", edition: "Shadow", categorie: "Croyances", intensity: true },
    { question: "Qu'est-ce que j'évite dans ma vie personnelle ou mes relations ?", edition: "Shadow", categorie: "Évitement", intensity: true },
    { question: "De quelles façons je cherche l'approbation des autres ?", edition: "Shadow", categorie: "Validation", intensity: true },
    { question: "La façon dont je réagis quand quelqu'un n'est pas d'accord avec moi…", edition: "Shadow", categorie: "Désaccord", intensity: true },
    { question: "Quels rêves inaccomplis ai-je mis de côté ?", edition: "Shadow", categorie: "Rêves réprimés", intensity: true },
    { question: "Quelles expériences passées évoquent de la honte ?", edition: "Shadow", categorie: "Honte", intensity: true },
    { question: "Quelle part de mon potentiel ai-je hésité à embrasser ?", edition: "Shadow", categorie: "Potentiel", intensity: true },
    { question: "Qu'est-ce que je refuse de ressentir en ce moment ?", edition: "Shadow", categorie: "Résistance", intensity: true },
    { question: "Qu'est-ce que j'avoue rarement aux autres sur moi-même ?", edition: "Shadow", categorie: "Secrets", intensity: true },
    { question: "Quelle vérité sur moi-même ai-je niée ?", edition: "Shadow", categorie: "Déni", intensity: true },
    { question: "Le moment où je me sens le plus déconnecté de moi-même…", edition: "Shadow", categorie: "Déconnexion", intensity: true },
    { question: "De qui ai-je besoin pour me sentir complet ?", edition: "Shadow", categorie: "Dépendance", intensity: true },
    { question: "Quel masque je porte le plus souvent, et pourquoi ?", edition: "Shadow", categorie: "Masques", intensity: true },
    { question: "Quelle partie de mon passé continue de contrôler ma vie présente ?", edition: "Shadow", categorie: "Passé", intensity: true },
    { question: "La façon dont je me punis quand les choses vont bien…", edition: "Shadow", categorie: "Auto-sabotage", intensity: true },
    { question: "Quelle conversation difficile ai-je évitée, et pourquoi ?", edition: "Shadow", categorie: "Évitement", intensity: true },
    { question: "De quelle façon je blesse les autres sans m'en rendre compte ?", edition: "Shadow", categorie: "Blessures", intensity: true },
    { question: "Quel aspect de ma sexualité ai-je du mal à accepter ?", edition: "Shadow", categorie: "Sexualité", intensity: true },
    { question: "Comment la honte autour de mes désirs affecte-t-elle mes relations ?", edition: "Shadow", categorie: "Honte sexuelle", intensity: true },
    { question: "Quels désirs inexprimés j'aimerais pouvoir explorer ?", edition: "Shadow", categorie: "Désirs cachés", intensity: true },
    { question: "Comment ai-je réprimé ma vraie nature pour éviter le rejet ?", edition: "Shadow", categorie: "Authenticité", intensity: true },
    { question: "Quels conflits internes surgissent quand j'essaie de vivre authentiquement ?", edition: "Shadow", categorie: "Conflits", intensity: true },

    // ÉDITION ÉVEIL
    { question: "Une expérience spirituellement intuitive que j'ai eue…", edition: "Éveil", categorie: "Spiritualité", intensity: false },
    { question: "Ma relation avec le concept de but dans la vie…", edition: "Éveil", categorie: "Sens", intensity: false },
    { question: "L'aventure spirituelle que je veux vivre un jour…", edition: "Éveil", categorie: "Aventure", intensity: false },
    { question: "L'élément avec lequel je m'identifie le plus…", edition: "Éveil", categorie: "Nature", intensity: false },
    { question: "Si j'avais un jour de plus à vivre, je…", edition: "Éveil", categorie: "Priorités", intensity: false },
    { question: "Ce qui rend la vie digne d'être vécue pour moi…", edition: "Éveil", categorie: "Sens", intensity: false },
    { question: "Un moment où j'ai ressenti l'unité avec tout ce qui existe…", edition: "Éveil", categorie: "Unité", intensity: false },
    { question: "Comment je définis la spiritualité pour moi…", edition: "Éveil", categorie: "Définition", intensity: false },
    { question: "Quelle pratique spirituelle me nourrit le plus ?", edition: "Éveil", categorie: "Pratique", intensity: false },
    { question: "Comment je me connecte au sacré dans le quotidien…", edition: "Éveil", categorie: "Sacré", intensity: false },
    { question: "Quel enseignement spirituel a transformé ma vision de la vie ?", edition: "Éveil", categorie: "Enseignement", intensity: false },
    { question: "Dans quels moments je sens la présence du divin…", edition: "Éveil", categorie: "Divin", intensity: false },
    { question: "Comment la nature me guide-t-elle spirituellement ?", edition: "Éveil", categorie: "Nature", intensity: false },
    { question: "Quelle synchronicité m'a le plus marqué ?", edition: "Éveil", categorie: "Synchronicité", intensity: false },
    { question: "Comment je cultive la gratitude dans ma vie…", edition: "Éveil", categorie: "Gratitude", intensity: false },
    { question: "Ce à quoi mon âme me dit que je résiste…", edition: "Éveil", categorie: "Guidance intérieure", intensity: true },
    { question: "Ce que je crains le plus de la mort…", edition: "Éveil", categorie: "Mortalité", intensity: true },
    { question: "Qui es-tu au-delà de tes pensées, émotions et croyances ?", edition: "Éveil", categorie: "Non-dualité", intensity: true },
    { question: "Que reste-t-il quand tu arrêtes de t'identifier à ton histoire personnelle ?", edition: "Éveil", categorie: "Non-dualité", intensity: true },
    { question: "Peux-tu trouver une frontière où tu commences ou finis vraiment ?", edition: "Éveil", categorie: "Non-dualité", intensity: true },
    { question: "Qui est conscient des pensées qui traversent ton esprit ?", edition: "Éveil", categorie: "Conscience", intensity: true },
    { question: "Y a-t-il un soi séparé, ou seulement des pensées et des sensations ?", edition: "Éveil", categorie: "Non-dualité", intensity: true },
    { question: "Quand tu lâches tous tes rôles et étiquettes, que reste-t-il ?", edition: "Éveil", categorie: "Identité", intensity: true },
    { question: "Qui pose ces questions ?", edition: "Éveil", categorie: "Conscience", intensity: true },
    { question: "Qu'est-ce qui observe tes émotions aller et venir ?", edition: "Éveil", categorie: "Observateur", intensity: true },
    { question: "Peux-tu trouver le « je » qui cherche l'éveil ?", edition: "Éveil", categorie: "Chercheur", intensity: true },
    { question: "Qu'est-ce qui reste constant pendant que tout change autour de toi ?", edition: "Éveil", categorie: "Permanence", intensity: true },
    { question: "Où es-tu quand tu n'es pas dans tes pensées ?", edition: "Éveil", categorie: "Présence", intensity: true },
    { question: "Qu'est-ce qui connaît l'expérience d'être perdu ?", edition: "Éveil", categorie: "Connaissance", intensity: true },
    { question: "Y a-t-il quelqu'un qui médite, ou seulement la méditation ?", edition: "Éveil", categorie: "Méditation", intensity: true },
    { question: "Qu'est-ce qui était là avant ta première pensée ce matin ?", edition: "Éveil", categorie: "Être", intensity: true },

    // ÉDITION BIZARRE
    { question: "Si tu étais un virus, dans quel organe aimerais-tu vivre, et pourquoi ?", edition: "Bizarre", categorie: "Absurde", intensity: false },
    { question: "Quelle conversation as-tu eue avec ton reflet dans le miroir récemment ?", edition: "Bizarre", categorie: "Intimité bizarre", intensity: false },
    { question: "Si tes pensées avaient une odeur, laquelle dégagerais-tu en ce moment ?", edition: "Bizarre", categorie: "Synesthésie", intensity: false },
    { question: "Quel objet inanimé de ta maison a le plus de personnalité, selon toi ?", edition: "Bizarre", categorie: "Anthropomorphisme", intensity: false },
    { question: "Si tu pouvais manger une émotion, laquelle aurait le meilleur goût ?", edition: "Bizarre", categorie: "Synesthésie", intensity: false },
    { question: "Raconte-moi le rêve le plus étrange que tu aies fait ces derniers temps.", edition: "Bizarre", categorie: "Inconscient", intensity: false },
    { question: "Si tu étais un fantôme, qui irais-tu hanter, et comment ?", edition: "Bizarre", categorie: "Fantastique", intensity: false },
    { question: "Quelle partie de ton corps a sa propre personnalité ?", edition: "Bizarre", categorie: "Corps bizarre", intensity: false },
    { question: "Si tu pouvais communiquer avec une seule espèce animale, laquelle ?", edition: "Bizarre", categorie: "Communication", intensity: false },
    { question: "Quel super-pouvoir complètement inutile aimerais-tu avoir ?", edition: "Bizarre", categorie: "Absurde", intensity: false },
    { question: "Si ta vie était un plat cuisiné, quels en seraient les ingrédients secrets ?", edition: "Bizarre", categorie: "Métaphore", intensity: false },
    { question: "Quelle couleur représente le mieux le son de ta voix ?", edition: "Bizarre", categorie: "Synesthésie", intensity: false },
    { question: "Si tu pouvais être invisible, mais seulement dans les toilettes publiques, qu'en ferais-tu ?", edition: "Bizarre", categorie: "Gênant", intensity: false },
    { question: "Quel est ton plan secret pour survivre à l'apocalypse zombie ?", edition: "Bizarre", categorie: "Survie", intensity: false },
    { question: "Si tes émotions étaient des personnages de dessins animés, à quoi ressembleraient-elles ?", edition: "Bizarre", categorie: "Personnification", intensity: false },
    { question: "Quelle est la chose la plus bizarre que tu aies faite seul chez toi ?", edition: "Bizarre", categorie: "Intimité bizarre", intensity: false },
    { question: "Si tu pouvais avoir une conversation de 5 minutes avec ton cerveau, que lui dirais-tu ?", edition: "Bizarre", categorie: "Méta", intensity: false },
    { question: "Quel animal penses-tu avoir été dans une vie antérieure ?", edition: "Bizarre", categorie: "Réincarnation", intensity: false },
    { question: "Si tu pouvais remplacer tous les bruits de pets par un autre son, lequel choisirais-tu ?", edition: "Bizarre", categorie: "Gênant", intensity: false },
    { question: "Quelle est la théorie du complot la plus plausible, selon toi ?", edition: "Bizarre", categorie: "Conspiration", intensity: false },
    { question: "Si tu étais un boss de jeu vidéo, quel serait ton point faible ridicule ?", edition: "Bizarre", categorie: "Gaming", intensity: false },
    { question: "Si tu pouvais voir l'aura des gens, de quelle couleur serait la tienne ?", edition: "Bizarre", categorie: "Énergie", intensity: false },
    { question: "Si tu étais un objet paranormal, quelles seraient tes propriétés dangereuses ?", edition: "Bizarre", categorie: "Paranormal", intensity: false },
    { question: "Si tu pouvais sentir les pensées des autres comme des parfums, qu'est-ce que ça changerait pour toi ?", edition: "Bizarre", categorie: "Télépathie", intensity: false },
    { question: "Si tu étais un glitch dans la Matrice, comment te manifesterais-tu ?", edition: "Bizarre", categorie: "Réalité simulée", intensity: false },
    { question: "Si tu pouvais fusionner avec un objet pendant 24 h, lequel choisirais-tu ?", edition: "Bizarre", categorie: "Transformation", intensity: false },
    { question: "Si tu pouvais implanter une pensée bizarre dans l'esprit de tous, laquelle choisirais-tu ?", edition: "Bizarre", categorie: "Contrôle mental", intensity: false },
    { question: "Quel dialogue intérieur as-tu le plus souvent avec toi-même ?", edition: "Bizarre", categorie: "Voix intérieure", intensity: true },
    { question: "Quelle partie de ton corps interrogerais-tu si elle pouvait parler ?", edition: "Bizarre", categorie: "Corps bizarre", intensity: true },
    { question: "Quel est ton rituel secret le plus bizarre, que personne ne connaît ?", edition: "Bizarre", categorie: "Rituels secrets", intensity: true },
    { question: "Quelle est la chose la plus gênante que ton corps fait automatiquement ?", edition: "Bizarre", categorie: "Gênant", intensity: true },
    { question: "Quel secret inavouable as-tu à propos de tes habitudes aux toilettes ?", edition: "Bizarre", categorie: "Intime gênant", intensity: true },
    { question: "Quelle conversation as-tu eue avec tes parties intimes récemment ?", edition: "Bizarre", categorie: "Intimité extrême", intensity: true },
    { question: "Si tes traumatismes étaient des monstres, à quoi ressembleraient-ils ?", edition: "Bizarre", categorie: "Trauma artistique", intensity: true },
    { question: "Quel aspect de toi te fait penser que quelque chose cloche chez toi ?", edition: "Bizarre", categorie: "Auto-questionnement", intensity: true }
  ];

  // Définition des éditions (classes de dégradé écrites en toutes lettres)
  const editions = {
    'Complète': {
      icon: Sparkles,
      color: 'from-yellow-400 to-orange-500',
      description: 'Toutes les questions mélangées, de toutes les éditions'
    },
    'Original': {
      icon: Heart,
      color: 'from-blue-400 to-blue-600',
      description: 'Les grandes questions de la vie pour apprendre à se connaître'
    },
    'Optimiste': {
      icon: Sun,
      color: 'from-pink-400 to-pink-600',
      description: 'Une grande bouffée d\'optimisme pour découvrir de bons côtés'
    },
    'Connexion à soi': {
      icon: Brain,
      color: 'from-green-400 to-green-600',
      description: 'Prendre soin de ses émotions et développer son empathie'
    },
    'Écouter sa boussole': {
      icon: Clock,
      color: 'from-red-400 to-red-600',
      description: 'Prendre sa vie en main et faire des choix cohérents'
    },
    'Connexion': {
      icon: Users,
      color: 'from-purple-400 to-purple-600',
      description: 'Amorces à compléter pour créer des liens authentiques'
    },
    'Shadow': {
      icon: Moon,
      color: 'from-gray-600 to-gray-800',
      description: 'Travail en profondeur sur les aspects cachés de soi'
    },
    'Éveil': {
      icon: Eye,
      color: 'from-indigo-400 to-indigo-600',
      description: 'Exploration spirituelle et questionnement non-duel'
    },
    'Bizarre': {
      icon: Sparkles,
      color: 'from-lime-400 to-cyan-500',
      description: 'Questions improbables, gênantes et renversantes !'
    },
    'Sexualité': {
      icon: Heart,
      color: 'from-rose-500 to-pink-700',
      description: 'Exploration profonde et psychanalytique de la sexualité et de l\'intimité'
    }
  };

  const getFilteredQuestions = () => {
    let filtered;

    if (selectedEdition === 'Complète') {
      filtered = allQuestions;
    } else {
      filtered = allQuestions.filter(q => q.edition === selectedEdition);
    }

    // Mode Intensité : SEULEMENT les questions intenses
    if (intensityMode) {
      filtered = filtered.filter(q => q.intensity === true);
    }
    // Mode Doux : SEULEMENT les questions non-intenses
    else if (gentleMode) {
      filtered = filtered.filter(q => q.intensity === false);
    }
    // Mode par défaut : TOUTES les questions (intenses + non-intenses)

    return filtered;
  };

  const getRandomQuestion = () => {
    const filteredQuestions = getFilteredQuestions();
    if (filteredQuestions.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex];
  };

  const handleIntensityModeChange = (checked) => {
    setIntensityMode(checked);
    if (checked) {
      setGentleMode(false); // Désactive le mode doux si on active l'intensité
    }
  };

  const handleGentleModeChange = (checked) => {
    setGentleMode(checked);
    if (checked) {
      setIntensityMode(false); // Désactive le mode intensité si on active le mode doux
    }
  };

  const generateNewQuestion = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const newQuestion = getRandomQuestion();
      setCurrentQuestion(newQuestion);
      setIsAnimating(false);
    }, 200);
  };

  useEffect(() => {
    setCurrentQuestion(null);
  }, [selectedEdition]);

  const getQuestionColor = (question) => {
    if (selectedEdition === 'Complète' && question) {
      return editions[question.edition]?.color || 'from-gray-400 to-gray-600';
    }
    return editions[selectedEdition]?.color || 'from-gray-400 to-gray-600';
  };

  const EditionIcon = editions[selectedEdition]?.icon || Heart;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-rose-50 flex flex-col">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500">
        {/* Cercles floutés en fond pour la profondeur */}
        <div className="pointer-events-none absolute -top-16 -left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-8 w-72 h-72 rounded-full bg-rose-300/30 blur-3xl" />
        <div className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-violet-300/25 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Badge logo en verre dépoli : deux cercles entrelacés */}
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center">
              <svg viewBox="0 0 44 44" className="w-8 h-8" fill="none" aria-hidden="true">
                <circle cx="17" cy="22" r="10" stroke="white" strokeWidth="2.5" opacity="0.95" />
                <circle cx="27" cy="22" r="10" stroke="white" strokeWidth="2.5" opacity="0.7" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
                Résonances
              </h1>
              <p className="text-sm md:text-base text-white/85">
                Cartes pour des conversations qui comptent
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Paramètres"
            className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white/25 transition-colors"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Fin liseré dégradé sous le header */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-rose-400" />
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Settings Panel */}
        {showSettings && (
          <div className="lg:w-80 bg-white/90 backdrop-blur-sm shadow-lg border-r border-violet-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Paramètres</h3>

            {/* Edition Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Édition</label>
              <div className="space-y-2">
                {Object.entries(editions).map(([key, edition]) => {
                  const Icon = edition.icon;
                  const questionCount = key === 'Complète'
                    ? allQuestions.length
                    : allQuestions.filter(q => q.edition === key).length;

                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedEdition(key)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        selectedEdition === key
                          ? `bg-gradient-to-r ${edition.color} text-white shadow-lg`
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{key}</div>
                            <div className={`text-xs ${selectedEdition === key ? 'text-white/80' : 'text-gray-400'}`}>
                              {questionCount} questions
                            </div>
                          </div>
                          <div className={`text-xs ${selectedEdition === key ? 'text-white/80' : 'text-gray-500'}`}>
                            {edition.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mode Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Mode de questions</label>

              {/* Mode Doux */}
              <label className="flex items-center gap-3 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={gentleMode}
                  onChange={(e) => handleGentleModeChange(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <div>
                  <div className="font-medium text-gray-700">Mode Doux</div>
                  <div className="text-xs text-gray-500">Uniquement les questions légères et bienveillantes</div>
                </div>
              </label>

              {/* Mode Intensité */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={intensityMode}
                  onChange={(e) => handleIntensityModeChange(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <div>
                  <div className="font-medium text-gray-700">Mode Intensité</div>
                  <div className="text-xs text-gray-500">Uniquement les questions de travail en profondeur</div>
                </div>
              </label>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-violet-100 to-rose-100 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Comment jouer ?</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Chacun choisit ce qu'il veut partager</li>
                <li>• Écoute bienveillante et sans jugement</li>
                <li>• Ce qui est dit reste confidentiel</li>
                <li>• Il n'y a pas de bonne ou de mauvaise réponse</li>
              </ul>
            </div>
          </div>
        )}

        {/* Main Question Area */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            {/* Question Card */}
            <div className={`bg-gradient-to-br ${getQuestionColor(currentQuestion)} rounded-3xl shadow-2xl p-8 text-white transform transition-all duration-500 ${
              isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
            } ${currentQuestion ? 'hover:scale-105' : ''}`}>
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  {currentQuestion && selectedEdition === 'Complète' ?
                    React.createElement(editions[currentQuestion.edition]?.icon || Heart, { className: "w-8 h-8 text-white" }) :
                    <EditionIcon className="w-8 h-8 text-white" />
                  }
                </div>
              </div>

              <div className="text-center">
                {currentQuestion ? (
                  <>
                    <div className="text-sm opacity-80 mb-4 flex items-center justify-center gap-2 flex-wrap">
                      <span>
                        {selectedEdition === 'Complète' ? currentQuestion.edition : selectedEdition}
                      </span>
                      {intensityMode && <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Mode Intensité</span>}
                      {gentleMode && <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Mode Doux</span>}
                      {currentQuestion.intensity && !intensityMode && !gentleMode && <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Profond</span>}
                      {currentQuestion.categorie && (
                        <span className="text-xs opacity-70">• {currentQuestion.categorie}</span>
                      )}
                    </div>

                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8">
                      {currentQuestion.question}
                    </h2>
                  </>
                ) : (
                  <div className="py-8">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8 opacity-70">
                      Prêt(e) pour une conversation authentique ?
                    </h2>
                  </div>
                )}

                <button
                  onClick={generateNewQuestion}
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
                  disabled={isAnimating}
                >
                  <Shuffle className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
                  {currentQuestion ? 'Nouvelle question' : 'Tirer une carte'}
                </button>
              </div>
            </div>

            {/* Question Count */}
            <div className="text-center mt-6 text-gray-600">
              <p className="text-sm">
                {getFilteredQuestions().length} questions disponibles
                {intensityMode && " (mode intensité)"}
                {gentleMode && " (mode doux)"}
                {!intensityMode && !gentleMode && " (toutes les questions)"}
              </p>
            </div>

            {/* Dyad Instructions Toggle */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowDyadInstructions(!showDyadInstructions)}
                className="text-violet-700 hover:text-violet-900 text-sm font-medium flex items-center gap-2 mx-auto"
              >
                <Info className="w-4 h-4" />
                {showDyadInstructions ? 'Masquer' : 'Afficher'} les instructions Dyade
              </button>
            </div>

            {/* Dyad Instructions */}
            {showDyadInstructions && (
              <div className="mt-4 bg-violet-50 border border-violet-200 rounded-xl p-6 transform transition-all duration-300">
                <h3 className="font-semibold text-violet-800 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Instructions Dyade (exercice à deux)
                </h3>
                <div className="text-sm text-violet-700 space-y-3">
                  <div>
                    <p><strong>🤝 Préparation :</strong></p>
                    <p className="ml-4">• Asseyez-vous confortablement, face à face</p>
                    <p className="ml-4">• Décidez qui commence comme orateur, qui comme écoutant</p>
                  </div>

                  <div>
                    <p><strong>🔇 1. Silence initial (1 minute) :</strong></p>
                    <p className="ml-4">• Fermez les yeux et respirez profondément</p>
                    <p className="ml-4">• Centrez-vous sur le moment présent</p>
                  </div>

                  <div>
                    <p><strong>🗣️ 2. Partage authentique (5 minutes) :</strong></p>
                    <p className="ml-4">• L'orateur répond à la question</p>
                    <p className="ml-4">• Parlez depuis le cœur, sans censure</p>
                    <p className="ml-4">• L'écoutant reste complètement silencieux</p>
                  </div>

                  <div>
                    <p><strong>👂 3. Écoute empathique :</strong></p>
                    <p className="ml-4">• L'écoutant maintient un contact visuel bienveillant</p>
                    <p className="ml-4">• Pas de conseils, de commentaires ou de questions</p>
                    <p className="ml-4">• Juste une présence attentive et aimante</p>
                  </div>

                  <div>
                    <p><strong>🔄 4. Inversion des rôles :</strong></p>
                    <p className="ml-4">• Changez de rôle pour la même question</p>
                    <p className="ml-4">• L'écoutant devient orateur, et inversement</p>
                  </div>

                  <div>
                    <p><strong>🔇 5. Silence final (1 minute) :</strong></p>
                    <p className="ml-4">• Moment d'intégration en silence</p>
                    <p className="ml-4">• Remerciez-vous mutuellement d'un regard</p>
                  </div>

                  <div className="bg-violet-100 p-3 rounded-lg mt-4">
                    <p className="font-medium text-violet-800">💫 Une pratique qui fait du bien :</p>
                    <p className="text-xs text-violet-600 mt-1">
                      Renforce l'empathie, apaise le stress, consolide les liens et développe l'intelligence émotionnelle.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResonancesApp;
