const leftNavStructure = [
  {
    'title': 'Home',
    'icon': 'places-home-1',
    'url': '#',
    'classes': 'custom-class',
    'attributes': {
      'custom-attribute-1': 'custom-attribute-1-value',
      'custom-attribute-2': '',
    },
  },
  {
    'title': 'Company',
    'icon': 'bank-2',
    'classes': ['custom-class-1', 'custom-class-2', 'custom-class-n'],
    'items': [
      {
        'title': 'Company Search',
        'url': '#',
        'classes': 'custom-class-1',
        'attributes': {
          'custom-attribute-1': 'custom-attribute-1-value',
          'custom-attribute-2': '',
        },
      },
      {
        'title': 'Company Details',
        'url': '#',
      },
    ],
  },
  {
    'title': 'Properties',
    'icon': 'building-7',
    'active': true,
    'items': [
      {
        'title': 'Level 2 Sub Navigation Item',
        'active': true,
        'items': [
          {
            'title': 'Level 3 Sub Navigation Item (Active)',
            'url': '#',
            'active': true,
          },
          {
            'title': 'Level 3 Sub Navigation Item',
            'items': [
              {
                'title': 'Level 4 Sub Navigation Item',
                'items': [
                  {
                    'title': 'Level 5 Sub Navigation Item',
                    'url': '#',
                  },
                  {
                    'title': 'Level 5 Sub Navigation Item',
                    'items': [
                      {
                        'title': 'Level 6 Sub Navigation Item',
                        'url': '#',
                      },
                    ],
                  },
                ],
              },
              {
                'title': 'Level 4 Sub Navigation Item',
                'url': '#',
              },
            ],
          },
        ],
      },
      {
        'title': 'Level 2 Sub Navigation Item',
        'url': '#',
      },
    ],
  },
  {
    'title': 'Products',
    'icon': 'content-view-module-1',
    'url': '#',
  },
  {
    'title': 'People',
    'icon': 'user',
    'url': '#',
  },
  {
    'title': 'Roles & Rights',
    'icon': 'key-1',
    'url': '#',
  },
  {
    'title': 'Settings',
    'icon': 'cog-box',
    'url': '#',
  },
]

const leftNavDataDriven = document.querySelector('ui-left-nav')

leftNavDataDriven.api.items = leftNavStructure
