# Fastgpt-bingsearch-worker
一个可以搭在cloudflareworkers上的bing接口


## 教程

### 1.申请Azure学生100USD账号/Azure免费200USD账号
- 教程网上一搜一堆，这里不再赘述

### 2.申请BingAPI
- 首先进入https://www.customsearch.ai/申请BingAPI
- ![image](https://github.com/Nothingness-Void/Fastgpt-bingsearch-worker/assets/55913486/ac48824f-193d-4827-a801-4a729ac0a36d)
- 创建一个实例，名字随意
- 点到Production
- ![image](https://github.com/Nothingness-Void/Fastgpt-bingsearch-worker/assets/55913486/7edbb1a7-15de-40b8-ae80-6a89d8a8dc34)
- 会跳转到Ms Azure 需要有Azure订阅
- ![image](https://github.com/Nothingness-Void/Fastgpt-bingsearch-worker/assets/55913486/bdae45dd-398b-4d2f-95e2-ceb681dea91e)
- 资源创建完成后跳转到资源
- ![image](https://github.com/Nothingness-Void/Fastgpt-bingsearch-worker/assets/55913486/6879b1d5-6ad2-45c1-98d8-c742e40ebc6e)
- ![image](https://github.com/Nothingness-Void/Fastgpt-bingsearch-worker/assets/55913486/5f562f4b-0c6b-4018-85c3-8d2768cda1da)



- 回到申请BIngAPI界面，将API粘贴进去 并在QUery里面输入要搜索的内容点击Call
- ![image](https://github.com/Nothingness-Void/Fastgpt-bingsearch-worker/assets/55913486/f17d2569-2ee3-4c42-b4a4-d9ab04540b19)
- 如果返回了搜索内容
- ![image](https://github.com/Nothingness-Void/Fastgpt-bingsearch-worker/assets/55913486/5b3f4375-d790-49c8-a991-f69aa718fdb2)
- 则代表API正常
- 即可将Custom Configuration ID和Subscription Key先复制下来保存
- 复制workers.js里的代码，粘贴到cloudflare woekers里
- 并分别填入刚才复制的值到代码的第三行和第一行的留空中
- 部署该js即可使用
- FastGPT里http调用模块配置如下，其中链接填自己的wokers部署域名即可
- ![image](https://github.com/Nothingness-Void/Fastgpt-bingsearch-worker/assets/55913486/e3f0da8a-4a98-4d6e-a608-d316c926f6d3)

