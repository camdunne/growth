module.exports = {
  "env": {
        "browser": true,
        "meteor": true,
        "node": true,
        "es6": true
  },
  "extends": "airbnb",
  "plugins": [
      "react",
      "jsx-a11y",
      "import"
  ],
  "rules":{
        "no-console": 0,
        "react/prop-types": [
          0,
          { ignore: [
            'location',
            'pathname',
            'history',
            'history.push',
            'handleSubmit',
            'pristine',
            'submitting',
            'reset',
          ],
            customValidators: []
          }
        ]
    }
};
