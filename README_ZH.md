[English](/README.md) | [中文](/README.md)

## 目录
- [目录](#目录)
  - [准备阶段](#准备阶段)
    - [BTP 账户](#btp-账户)
    - [工具](#工具)
  - [开发](#开发)
  - [测试（本地）](#测试本地)
  - [部署](#部署)
  - [测试 （BTP subaccount）](#测试-btp-subaccount)
  - [参考](#参考)

### 准备阶段 

#### BTP 账户

使用该 [link](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/e50ab7b423f04a8db301d7678946626e.html) 申请BTP的试用账户或者配置企业账户

#### 工具

   **Nodejs** 

   安装并配置 [Nodejs](https://nodejs.org/en/).

   **IDE** 
    
  使用 [VSC](https://code.visualstudio.com/) 作为开发集成环境, 或者其他个人合适的集成开发环境 
   
   * **VSC**
        安装 [vetrur extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

  **CF命令行**
     
   下载并配置: [Download and Install the Cloud Foundry Command Line Interface](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/4ef907afb1254e8286882a2bdef0edf4.html)
   
   直接下载链接: [https://github.com/cloudfoundry/cli#downloads](https://github.com/cloudfoundry/cli#downloads)

### 开发

步骤:

1.  通过命令行 : `npm install -g @vue/cli` 安装vue cli 工具

2.  通过命令行 : `vue ui ` 或者 `vue create my-project` 创建vue工程

3.  在根文件下添加多开发环境变量， .dev.dev 和.env.prod
   
   ![vueDevMode](/img/vueDevMode.png)

    文件名: .env.dev

    ```
      NODE_ENV = 'dev'
      VUE_APP_PORT=3000
    ```

   文件名: .env.prod

    ```
      NODE_ENV = 'prod'
      VUE_APP_PORT=80
    ```

4.  添加vue 配置文件 vue.config.js 
   
   ![vueDevMode](/img/vueConfigJS.png)

  样例代码:

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

### 测试（本地）

通过命令行 ```npm run serve``` 运行 Vue 工程

测试链接为: [http://localhost:8080/#](http://localhost:8080/#)

然后我们会获得如下页面 ， 这个月我们的nodejs + vue的工程就运行正常了.

![vueProjectWelcome](/img/vueProjectWelcome.png)

### 部署

部署至BTP，步骤如下:
1. 设置 cloud foundry endpoint
   
   命令行：

      ```cf api {EndpointURL} ```

   **EndpointURL** 你可以在子账户中看到对应的API endpint :
   ![APIEndPoint](/img/APIEndPoint.png)

2. 使用你的BTP账户登录对应的BTP CF环境
   命令行 :

      ```cf login ```

3. 添加 manifest.yml 到Vue工程的上一级目录
   ![manifest](/img/manifest.png)
4.  配置[route](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/53daaafe8f8345fc9b8497b86d17c9d9.html?q=routes) 以及相应的 [nodejs buildpacks](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/3a7a0bece0d044eca59495965d8a0237.html)

推荐使用以下方式形成对应的route :

 ```
   {subdomain}-{appname}.{cfappdoman}
 ```

**subdomain:** 

![subdomain](/img/subdomain.png)

**appname**: 由业务定义

**cfappsdomain:** 可使用命令行 ```cf domains ``` 获取对应的domains

![cfappdomain](/img/cfappdoman.png)

样例:

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
1. 部署 nodjs+vue 工程到TP环境中
   
   命令行 :
   
    ```cf push ```

### 测试 （BTP subaccount）

1. 导航到到 sapce
   
 ![space](/img/space.png)

2. 进入到 applcation 
   
 ![space_application](/img/space_application.png)

3.  查看 applicaiton URL
   
 ![applicationOverview](/img/applicaiton_overview.png)

4.  用以下链接来测试
   
   ```
   {applicaitonURL}/#/
   ```

   获得如下页面, 我们的nodejs + vue工程 运行正常

   ![applciationWelcome](/img/ApplicationWelcome.png)

### 参考
创建与部署 你的第一个 Node.js App: [btp-nodejs-deploy](https://developers.sap.com/group.scp-5-node.html)

Vue JS guide :  [VueJs Guide](https://cli.vuejs.org/guide/)

