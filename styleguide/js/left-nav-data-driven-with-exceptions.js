const leftNavStructure = [
  {
    'title': 'Home',
    'icon': 'places-home-3',
    'url': '#',
  },
  {
    'title': 'Company',
    'icon': 'building-16',
    'counts': '1',
    'active': true,
    'items': [
      {
        'title': 'Company Search',
        'icon': 'real-estate-search',
        'url': '#',
        'active': true,
      },
      {
        'title': 'Company Details',
        'icon': 'real-estate-information',
        'url': '#',
        'counts': '1',
      },
    ],
  },
  {
    'title': 'Properties',
    'icon': 'building-hotel',
    'colorClass': 'text-danger',
    'items': [
      {
        'title': 'Property Subitem Level 1',
        'items': [
          {
            'title': 'Property Subitem Level 2',
            'items': [
              {
                'title': 'Property Subitem Level 3',
                'items': [
                  {
                    'title': 'Property Subitem Level 4',
                    'items': [
                      {
                        'title': 'Property Subitem Level 5',
                        'icon': 'real-estate-address-book-1',
                        'url': '#',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        'title': 'Property Search',
        'url': '#',
        'colorClass': 'text-danger',
      },
      {
        'title': 'Property Details',
        'url': '#',
      },
    ],
  },
  {
    'title': 'Products',
    'icon': 'fa fa-th',
    'counts': '18',
    'items': [
      {
        'title': 'Product 1',
        'icon': 'fa fa-laptop',
        'url': '#',
        'counts': '5',
      },
      {
        'title': 'Product 2',
        'url': '#',
        'counts': '4',
      },
      {
        'title': 'Product 3',
        'url': '#',
        'counts': '9',
      },
    ],
  },
]

const leftNavDataDriven = document.getElementById('left-nav-data-driven-with-exceptions')

leftNavDataDriven.api.items = leftNavStructure
