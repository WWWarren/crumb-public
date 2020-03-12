export const recipes =
  [
    {
      createdBy: 'testUser',
      description: 'A description',
      difficulty: '6',
      id: 'abcde12345',
      ingredients: [
        'ingredient1', 'ingredient2', 'ingredient3'
      ],
      name: 'Test Recipe',
      rating: [
        { rating: 4, user: 'me' }
      ]
    }
  ];

export const filters =
  [
    {
      name: 'Filter1',
      value: 0,
      type: 'slider'
    }
  ];

export const users =
  [
    {
      email: 'test@email.com',
      firstName: 'Test',
      id: 'abcde12345',
      lastName: 'Account',
      recipes: [
        'recipe1', 'recipe2', 'recipe3'
      ]
    }
  ]

export const ingredients =
  [
    {
      list: ['ui1', 'ui2']
    }
  ]

export const comments =
  [
    {
      recipe: 'abcde12345',
      text: 'A comment',
      time: '01/01/1970',
      userID: 'abcde12345',
      userName: 'A Name'
    }
  ]
