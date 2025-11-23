self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [
      {
        "has": [
          {
            "type": "header",
            "key": "next-url",
            "value": "/items(?:/.*)?"
          }
        ],
        "source": "/items/:nxtIid/edit",
        "destination": "/items/(.):nxtIid/edit"
      },
      {
        "has": [
          {
            "type": "header",
            "key": "next-url",
            "value": "/items(?:/.*)?"
          }
        ],
        "source": "/items/create",
        "destination": "/items/(.)create"
      },
      {
        "has": [
          {
            "type": "header",
            "key": "next-url",
            "value": "/parties(?:/.*)?"
          }
        ],
        "source": "/parties/new",
        "destination": "/parties/(.)new"
      }
    ],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()