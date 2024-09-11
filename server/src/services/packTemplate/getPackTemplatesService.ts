export async function getPackTemplatesService() {
  return [
    {
      id: 'p16zkvg7uvfo4ouwd07qmhli',
      name: 'Day Hike Must-Haves',
      owner_id: 'knihcxig5b6murix7xr4jyph',
      is_public: true,
      grades: {
        weight: '',
        essentialItems: '',
        redundancyAndVersatility: '',
      },
      scores: {
        weightScore: 0,
        essentialItemsScore: 0,
        redundancyAndVersatilityScore: 0,
      },
      type: 'pack',
      createdAt: '2024-07-13 09:48:20',
      updatedAt: '2024-07-13 09:48:20',
      owner: {
        id: 'knihcxig5b6murix7xr4jyph',
        name: 'Test',
        username: 'mikibo',
      },
      userFavoritePacks: [],
      itemPacks: [
        {
          packId: 'p16zkvg7uvfo4ouwd07qmhli',
          item: {
            id: 'ewhojm0av0e790r7bazsei7v',
            name: 'ramen',
            ownerId: 'knihcxig5b6murix7xr4jyph',
            weight: 1.2,
            quantity: 3,
            unit: 'lb',
            category: {
              id: 'jdu4s6u0ssfziuza3vufal6h',
              name: 'Food',
            },
          },
        },
        {
          packId: 'p16zkvg7uvfo4ouwd07qmhli',
          item: {
            id: 'lux1htobitgs3ri1oqjs16us',
            name: 'Trail Shoes',
            ownerId: 'knihcxig5b6murix7xr4jyph',
            weight: 0,
            quantity: 0,
            unit: '',
            category: {
              id: 'z19u0ysk89rd4yl2zcelz6fd',
              name: 'Essentials',
            },
          },
        },
      ],
      trips: [],
      total_weight: 1632.9312,
      favorites_count: 0,
      total_score: 0,
      is_template: true,
      items: [
        {
          id: 'ewhojm0av0e790r7bazsei7v',
          name: 'ramen',
          ownerId: 'knihcxig5b6murix7xr4jyph',
          weight: 1.2,
          quantity: 3,
          unit: 'lb',
          category: {
            id: 'jdu4s6u0ssfziuza3vufal6h',
            name: 'Food',
          },
        },
        {
          id: 'lux1htobitgs3ri1oqjs16us',
          name: 'Trail Shoes',
          ownerId: 'knihcxig5b6murix7xr4jyph',
          weight: 0,
          quantity: 0,
          unit: '',
          category: {
            id: 'z19u0ysk89rd4yl2zcelz6fd',
            name: 'Essentials',
          },
        },
      ],
    },
  ];
}
