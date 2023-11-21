const getCategoriesWithSubcategories = {
  '/api/v1/market/categories/get-all': {
    get: {
      tags: ['Categories'],
      summary: 'Categories get All',
      parameters: [],
      responses: {
        '200': {
          description: 'success',
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'Все категории успешно прошли!',
                payload: [
                  {
                    categoryId: 1,
                    categoryName: 'Электроника',
                    subCategories: [
                      {
                        subCategoryId: 6,
                        subCategoryName: 'Смартфоны',
                      },
                      {
                        subCategoryId: 7,
                        subCategoryName: 'Ноутбуки и ПК',
                      },
                      {
                        subCategoryId: 8,
                        subCategoryName: 'Телевизоры',
                      },
                      {
                        subCategoryId: 9,
                        subCategoryName: 'Камеры и фотоаппараты',
                      },
                      {
                        subCategoryId: 10,
                        subCategoryName: 'Аксессуары для электроники',
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
}

const Categories = { ...getCategoriesWithSubcategories }

export default Categories
