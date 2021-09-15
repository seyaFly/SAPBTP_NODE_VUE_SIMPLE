[English](/README.md) | [中文](/README.md)

## Table Of Content
- [Table Of Content](#table-of-content)
  - [Preparation](#preparation)
    - [BTP Account](#btp-account)
    - [Tools](#tools)
  - [Development](#development)
  - [Test(local)](#testlocal)
  - [Deployment](#deployment)
  - [Test(BTP subaccount)](#testbtp-subaccount)
  - [Refrence](#refrence)

### Preparation 

#### BTP Account

Use this [link](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/e50ab7b423f04a8db301d7678946626e.html) to apply and setup the BTP trial or enterpise enviroment

#### Tools

   **Nodejs** 

   Install and setup [Nodejs](https://nodejs.org/en/).

   **IDE** 
    
  we can use the [VSC](https://code.visualstudio.com/) as you favourite development IDE, or other IDE you like. 
   

   * **VSC**
       Install the [vetrur extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

  **CF Command line**
    
   Dowanload and Configration : [Download and Install the Cloud Foundry Command Line Interface](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/4ef907afb1254e8286882a2bdef0edf4.html)

   Direct Download link: [https://github.com/cloudfoundry/cli#downloads](https://github.com/cloudfoundry/cli#downloads)

     

### Development
Steps:

1. Install the vue cli via the  command : `npm install -g @vue/cli`

2. create vue project via the command : `vue ui ` or `vue create my-project`

3. add dev and prod mode envrioment variable for multiple development mode under root folder
   
   ![vueDevMode](/img/vueDevMode.png)

   fileName: .env.dev

    ```
      NODE_ENV = 'dev'
      VUE_APP_PORT=3000
    ```

   fileName: .env.prod

    ```
      NODE_ENV = 'prod'
      VUE_APP_PORT=80
    ```

4.  add vue.config.js 
   
   ![vueDevMode](/img/vueConfigJS.png)

   and here is the example code :

   ```Java Script
      var env = process.env.NODE_ENV;
      var bdisaBleHostCheck = false;
      let evnPort = process.env.PORT;

      if (env === "dev") {
          evnPort = 3000;
          bdisaBleHostCheck = false
      } else {
          bdisaBleHostCheck = true;
      }

      module.exports = {
          devServer: {
              port: evnPort,
              disableHostCheck: bdisaBleHostCheck
          }
      }
   ```

### Test(local)

Run Vue project with command line ```npm run serve```

Test it with the link : [http://localhost:8080/#](http://localhost:8080/#)


and then get this page .

![vueProjectWelcome](/img/vueProjectWelcome.png)

After that , the nodejs applciation is working fine

### Deployment

Deploy for BTP:
1. set cloud foundry endpoint via command :

      ```cf api {EndpointURL} ```

   **EndpointURL** you can find in your subaccount :
   ![APIEndPoint](/img/APIEndPoint.png)

2. login to your BTP endpoint with your btp user and password
   command :

      ```cf login ```

3. add manifest.yml for CF BTP development
   
   ![manifest](/img/manifest.png)

4. configure the [route](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/53daaafe8f8345fc9b8497b86d17c9d9.html?q=routes) and [nodejs buildpacks](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/3a7a0bece0d044eca59495965d8a0237.html)

here we suggest use bellow format as recomendation :

 ```
   {subdomain}-{appname}.{cfappdoman}
 ```

**subdomain:** 

![subdomain](/img/subdomain.png)

**appname**: defined by business

**cfappsdomain:** user the command ```cf domains ``` to get the domain url

![cfappdomain](/img/cfappdoman.png)

Example:

   ```
    ---
    applications:
    - name: nodejsapp
      command: npm run serve
      memory: 400M
      path: btpnodejs
      buildpacks: 
        - nodejs_buildpack
      routes: 
          - route: 91ccc175trial-nodejsapp.cfapps.ap21.hana.ondemand.com 
   ```
5. Deploy your nodjs project to your BTP Subaccount
   
   command :
   
    ```cf push ```

### Test(BTP subaccount)

1. Navigte to your space
   
 ![space](/img/space.png)

2. Go you applcation 
   
 ![space_application](/img/space_application.png)

3.  Get applicaiton URL
   
 ![applicationOverview](/img/applicaiton_overview.png)

4. Test it with the URL 
   
   ```
   {applicaitonURL}/#/
   ```

   After get the below response, then your nodejs application is working  fine

   ![applciationWelcome](/img/ApplicationWelcome.png)

### Refrence
Create and Deploy Your First Node.js App: [btp-nodejs-deploy](https://developers.sap.com/group.scp-5-node.html)

Vue JS guide :  [VueJs Guide](https://cli.vuejs.org/guide/)

