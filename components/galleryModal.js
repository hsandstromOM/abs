var h = require('hyperscript')

module.exports = function () {
  return h('.div', [
    h('.donateModal', {
      'style': 'width: 100%; margin: 0 auto; '
    }, [
      h('.modalBody', {
        'style': 'display:block;float:left;padding:20px;width:100%;background-color:white;'
      }, [
        h('div.carouselHero', {
          'style': 'display:block;float:left;width:100%;',
        }, [
          h('uib-carousel', {
            'data-active': 'active',
            'data-interval': 'myInterval'
          }, [
            h('uib-slide', {
              'data-ng-repeat': 'slide in gallery track by $index',
              'data-index': '$index'
            }, [
              h('img', {
                'data-ng-src': '{{slide.fields.file.url}}',
                'style': 'width:100%',
                'alt': '{{slide.fields.description || slide.fields.title}}'
              })
            ])
          ])
        ])
      ])
    ])
  ])
}
