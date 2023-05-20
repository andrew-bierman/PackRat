// Scoring System for Packs:

// Weight:
// Scale: 1-10 (10 being the lightest pack)
// Essential Items:
// Scale: 1-10 (10 being all essential items present)
// Redundancy and Versatility:
// Scale: 1-10 (10 being the least redundancy and high versatility)

function checkEssentialItems(packItems) {
    const essentialItems = {
        water: ['water', 'hydration'],
        food: ['food', 'nutrition'],
        map: ['map', 'navigation'],
        compass: ['compass'],
        firstAidKit: ['first aid kit', 'medical kit'],
        clothing: ['clothing', 'apparel'],
        shelter: ['shelter', 'tent'],
        firestarter: ['firestarter', 'firelighter'],
        navigationTools: ['navigation tools'],
        lightSource: ['light source', 'flashlight'],
        communicationDevice: ['communication device', 'phone'],
    };

    const totalItems = Object.keys(essentialItems).length;
    let presentItems = 0;

    for (const item in essentialItems) {
        // Check if the pack contains any item that matches or partially matches any name in the array
        const matchingItem = packItems.find((packItem) =>
            essentialItems[item].some((itemName) => packItem.toLowerCase().includes(itemName.toLowerCase()))
        );

        if (matchingItem) {
            presentItems++;
        }
    }

    // Calculate the essential items score
    const essentialItemsScore = (presentItems / totalItems) * 10;

    return essentialItemsScore;
}

function checkRedundancy(packItems) {
    const redundantItems = {
        multiTool: ['multi-tool', 'tool'],
        extraFlashlight: ['extra flashlight'],
        extraBatteries: ['extra batteries'],
        extraSocks: ['extra socks'],
        extraFood: ['extra food'],
        backupWaterContainer: ['backup water container'],
    };

    const totalRedundantItems = Object.keys(redundantItems).length;
    let presentRedundantItems = 0;

    // Create a set of unique lowercase item names for efficient comparison
    const uniquePackItems = new Set(packItems.map((item) => item.toLowerCase()));

    for (const item in redundantItems) {
        // Check if the pack contains more than one item that matches or partially matches any name in the array
        const matchingItems = packItems.filter((packItem) =>
            redundantItems[item].some((itemName) => packItem.toLowerCase().includes(itemName.toLowerCase()))
        );

        if (matchingItems.length > 1) {
            presentRedundantItems++;
        }
    }

    // Exclude certain items from being considered for redundancy
    const excludedItems = ['extra socks', 'extra food', 'backup water container'];
    const effectiveTotalRedundantItems = totalRedundantItems - excludedItems.length;

    // Calculate the redundancy score
    const redundancyScore = ((effectiveTotalRedundantItems - presentRedundantItems) / effectiveTotalRedundantItems) * 10;

    return redundancyScore;
}


export function calculatePackScore(packData) {
    const { weight, essentialItems, redundancyAndVersatility } = packData;

    // Define the grading thresholds for each factor
    const weightThreshold = 7; // A weight of 7 or below is considered good
    const essentialItemsThreshold = 8; // An essential items score of 8 or above is considered good
    const redundancyAndVersatilityThreshold = 8; // A redundancy and versatility score of 8 or above is considered good

    // Calculate the scores for each factor, using the helper functions defined above

    const weightScore = (weight / 10) * 100;
    const essentialItemsScore = checkEssentialItems(packData.items);
    const redundancyAndVersatilityScore = checkRedundancy(packData.items);


    // Calculate the scores for each factor
    // const weightScore = (weight / 10) * 100;
    // const essentialItemsScore = (essentialItems / 10) * 100;
    // const redundancyAndVersatilityScore = (redundancyAndVersatility / 10) * 100;

    // Determine the grades for each factor based on the thresholds
    const weightGrade = weightScore >= weightThreshold ? 'Good' : 'Needs Improvement';
    const essentialItemsGrade = essentialItemsScore >= essentialItemsThreshold ? 'Good' : 'Needs Improvement';
    const redundancyAndVersatilityGrade = redundancyAndVersatilityScore >= redundancyAndVersatilityThreshold ? 'Good' : 'Needs Improvement';

    // Calculate the total score
    const totalScore = (weightScore + essentialItemsScore + redundancyAndVersatilityScore) / 3;

    // Round the score to two decimal places
    const roundedScore = Math.round(totalScore * 100) / 100;

    return {
        score: roundedScore,
        grades: {
            weight: weightGrade,
            essentialItems: essentialItemsGrade,
            redundancyAndVersatility: redundancyAndVersatilityGrade,
        },
    };
}

