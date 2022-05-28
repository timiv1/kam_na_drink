# Frontend ionic-vue

> **_NOTE:_** You need to add .env file to frontend folder according to .env.example and change secret keys.

## Commands

Globally install ionic-vue:

```
 npm install -g @ionic/cli@latest
```

Run npm install to install all the dependencies:

```
npm install
```

### To start the application in development mode run:

```
ionic serve
```

### TO deploy on android

Reffer to https://ionicframework.com/docs/vue/your-first-app/deploying-mobile

```
npm install -g  native-run cordova-res
```

build for production

```
ionic build
```

```
ionic cap add android
```

```
ionic cap copy
```

```
ionic cap sync
```

TO open android

```
ionic cap open android
```
