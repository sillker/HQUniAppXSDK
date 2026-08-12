(function(vue) {
  "use strict";
  const { registerUTSInterface, initUTSProxyClass, initUTSProxyFunction, initUTSPackageName, initUTSIndexClassName, initUTSClassName } = uni;
  const name = "utsHqwxdata";
  const moduleName = "hqwx-data";
  const moduleType = "";
  const errMsg = "";
  const is_uni_modules = true;
  const pkg = /* @__PURE__ */ initUTSPackageName(name, is_uni_modules);
  const cls = /* @__PURE__ */ initUTSIndexClassName(name, is_uni_modules);
  const getPublicParams = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "getPublicParamsByJs", keepAlive: false, params: [], return: "" });
  const getLaunchParams = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "getLaunchParamsByJs", keepAlive: false, params: [], return: "" });
  const handleAction = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "handleActionByJs", keepAlive: false, params: [{ "name": "action", "type": "string" }, { "name": "params", "type": "UTSJSONObject" }], return: "" });
  const handlePage = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "handlePageByJs", keepAlive: false, params: [{ "name": "page", "type": "string" }], return: "" });
  class Qs extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            stringify: { type: "Unknown", optional: false },
            parse: { type: "Unknown", optional: false }
          };
        }
      };
    }
    constructor(options, metadata = Qs.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.stringify = this.__props__.stringify;
      this.parse = this.__props__.parse;
      delete this.__props__;
    }
  }
  const qs = new Qs({
    stringify(options) {
      let arr = [];
      for (let k in options) {
        arr.push("".concat(k, "=").concat(options[k]));
      }
      return arr.join("&");
    },
    parse(str) {
      let o = new UTSJSONObject({});
      let arr = str.split("&");
      arr.forEach((e) => {
        let a = e.split("=");
        a.length == 2 ? o[a[0]] = a[1] : o[a[0]] = "";
      });
      return o;
    }
  });
  function generateFullPath(url, query = null) {
    let fullPath = url;
    if (UTS.isInstanceOf(query, UTSJSONObject)) {
      fullPath += "?".concat(qs.stringify(query));
    }
    return fullPath;
  }
  class RouterOptions extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            url: { type: String, optional: false },
            query: { type: "Unknown", optional: true }
          };
        }
      };
    }
    constructor(options, metadata = RouterOptions.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.url = this.__props__.url;
      this.query = this.__props__.query;
      delete this.__props__;
    }
  }
  class Route extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            url: { type: String, optional: false },
            query: { type: "Unknown", optional: false }
          };
        }
      };
    }
    constructor(options, metadata = Route.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.url = this.__props__.url;
      this.query = this.__props__.query;
      delete this.__props__;
    }
  }
  class Router extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            push: { type: "Unknown", optional: false },
            replace: { type: "Unknown", optional: false },
            switchTab: { type: "Unknown", optional: false },
            reLaunch: { type: "Unknown", optional: false },
            go: { type: "Unknown", optional: false },
            app: { type: "Unknown", optional: false }
          };
        }
      };
    }
    constructor(options, metadata = Router.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.push = this.__props__.push;
      this.replace = this.__props__.replace;
      this.switchTab = this.__props__.switchTab;
      this.reLaunch = this.__props__.reLaunch;
      this.go = this.__props__.go;
      this.app = this.__props__.app;
      delete this.__props__;
    }
  }
  const useRoute = () => {
    let pages = getCurrentPages();
    let activePage = pages[pages.length - 1];
    return new Route({
      url: activePage.route,
      query: activePage.options
    });
  };
  const router = new Router({
    push(options) {
      return uni.navigateTo({
        url: generateFullPath(options.url, options.query)
      });
    },
    replace(options) {
      return uni.redirectTo({
        url: generateFullPath(options.url, options.query)
      });
    },
    switchTab(options) {
      return uni.switchTab({
        url: options.url
      });
    },
    reLaunch(options) {
      return uni.reLaunch({
        url: generateFullPath(options.url, options.query)
      });
    },
    go(delta = null) {
      uni.navigateBack(new UTSJSONObject({
        delta: Math.abs(delta !== null && delta !== void 0 ? delta : -1)
      }));
    },
    app(options) {
      uni.__log__("log", "at utils/router.uts:69", "跳转原生界面");
      handlePage(generateFullPath(options.url, options.query));
    }
  });
  const HOME_PAGE = "/pages/index/index";
  const _sfc_main$w = vue.defineComponent({
    onShow() {
      this.handleIOSLaunch();
    },
    methods: {
      handleIOSLaunch() {
        const launchParams = this.resolveIOSLaunchQuery();
        const targetUrl = this.getQueryString(launchParams, "targetUrl");
        const targetParams = this.getQueryValue(launchParams, "targetParams");
        this.navigateToPage(targetUrl, this.normalizeTargetParams(targetParams));
      },
      resolveIOSLaunchQuery() {
        try {
          const bridgeParams = getLaunchParams();
          if (bridgeParams != null && this.hasTargetUrl(bridgeParams)) {
            return bridgeParams;
          }
        } catch (e) {
          uni.__log__("error", "at pages/router/router.uvue:71", "[router] getLaunchParams fallback: " + e.message);
        }
        try {
          const launchOptions = uni.getLaunchOptionsSync();
          const launchQuery = this.normalizeQuery(launchOptions.query);
          if (this.hasTargetUrl(launchQuery)) {
            return launchQuery;
          }
          const schemeQuery = this.parseQueryFromUrl(this.safeString(launchOptions.appScheme));
          if (this.hasTargetUrl(schemeQuery)) {
            return schemeQuery;
          }
          const linkQuery = this.parseQueryFromUrl(this.safeString(launchOptions.appLink));
          if (this.hasTargetUrl(linkQuery)) {
            return linkQuery;
          }
        } catch (e) {
          uni.__log__("error", "at pages/router/router.uvue:91", "[router] launchOptions fallback failed: " + e.message);
        }
        return new UTSJSONObject();
      },
      hasTargetUrl(query) {
        const targetUrl = this.getQueryString(query, "targetUrl");
        return targetUrl != null && targetUrl.length > 0;
      },
      getQueryValue(query, key) {
        try {
          const value_1 = query.get(key);
          if (value_1 != null) {
            return value_1;
          }
        } catch (e) {
        }
        const value = query[key];
        return value !== null && value !== void 0 ? value : null;
      },
      getQueryString(query, key) {
        try {
          const value_2 = query.getString(key);
          if (value_2 != null) {
            return value_2;
          }
        } catch (e) {
        }
        const value = query[key];
        if (value == null) {
          return null;
        }
        return "".concat(value);
      },
      normalizeQuery(query = null) {
        if (query == null) {
          return new UTSJSONObject();
        }
        if (UTS.isInstanceOf(query, UTSJSONObject)) {
          return query;
        }
        try {
          return UTS.JSON.parse(UTS.JSON.stringify(query));
        } catch (e) {
          uni.__log__("error", "at pages/router/router.uvue:139", "[router] normalize launch query failed: " + e.message);
        }
        return new UTSJSONObject();
      },
      parseQueryFromUrl(url) {
        let query = new UTSJSONObject({});
        if (url.length == 0) {
          return query;
        }
        const queryStart = url.indexOf("?");
        if (queryStart < 0 || queryStart + 1 >= url.length) {
          return query;
        }
        let queryString = url.substring(queryStart + 1);
        const hashStart = queryString.indexOf("#");
        if (hashStart >= 0) {
          queryString = queryString.substring(0, hashStart);
        }
        queryString.split("&").forEach((pair) => {
          if (pair.length == 0)
            return null;
          const equalIndex = pair.indexOf("=");
          let key = "";
          let value = "";
          if (equalIndex >= 0) {
            key = pair.substring(0, equalIndex);
            value = pair.substring(equalIndex + 1);
          } else {
            key = pair;
          }
          key = this.safeDecode(key);
          if (key.length == 0)
            return null;
          query[key] = this.safeDecode(value);
        });
        return query;
      },
      safeString(value = null) {
        if (value == null) {
          return "";
        }
        return "".concat(value);
      },
      safeDecode(value) {
        try {
          return decodeURIComponent(value.split("+").join(" "));
        } catch (e) {
          return value;
        }
      },
      normalizeTargetParams(targetParams = null) {
        if (targetParams == null) {
          return null;
        }
        if (typeof targetParams == "string") {
          return this.safeDecode(targetParams);
        }
        if (UTS.isInstanceOf(targetParams, UTSJSONObject)) {
          return targetParams.toJSONString();
        }
        return UTS.JSON.stringify(targetParams);
      },
      stringifyQuery(query) {
        let items = [];
        for (let key in query) {
          const value = query[key];
          if (value == null)
            continue;
          items.push("".concat(encodeURIComponent(key), "=").concat(encodeURIComponent("".concat(value))));
        }
        return items.join("&");
      },
      buildTargetUrl(targetUrl, query) {
        const queryString = this.stringifyQuery(query);
        if (queryString.length == 0) {
          return targetUrl;
        }
        const separator = targetUrl.indexOf("?") >= 0 ? "&" : "?";
        return "".concat(targetUrl).concat(separator).concat(queryString);
      },
      // 统一的页面跳转逻辑
      navigateToPage(targetUrl = null, targetParams = null) {
        if (targetUrl == null || targetUrl.length == 0) {
          router.replace(new RouterOptions({
            url: HOME_PAGE
          }));
          return null;
        }
        if (targetParams != null && targetParams.length > 0) {
          try {
            const query = UTS.JSON.parse(targetParams);
            router.replace(new RouterOptions({
              url: this.buildTargetUrl(targetUrl, query)
            }));
          } catch (e) {
            uni.__log__("error", "at pages/router/router.uvue:264", "[router] parse targetParams error: " + e.message);
            router.replace(new RouterOptions({
              url: targetUrl
            }));
          }
        } else {
          router.replace(new RouterOptions({
            url: targetUrl
          }));
        }
      }
    }
  });
  const _sfc_main$v = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      function handler(url) {
        router.push(new RouterOptions({
          url,
          query: new UTSJSONObject({
            goodsId: 10023231,
            categoryId: 5847,
            productId: 266768
          })
        }));
      }
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("scroll-view", new UTSJSONObject({ style: new UTSJSONObject({ "flex": "1" }) }), [
          vue.createElementVNode("button", new UTSJSONObject({
            onClick: _cache[0] || (_cache[0] = ($event = null) => {
              return handler("/pages/study-report/index");
            })
          }), "学习报告"),
          vue.createElementVNode("button", new UTSJSONObject({
            onClick: _cache[1] || (_cache[1] = ($event = null) => {
              return handler("/pages/topic/index");
            })
          }), "题集"),
          vue.createElementVNode("button", new UTSJSONObject({
            onClick: _cache[2] || (_cache[2] = ($event = null) => {
              return handler("/pages/topic/chapter");
            })
          }), "章节练习"),
          vue.createElementVNode("button", new UTSJSONObject({
            onClick: _cache[3] || (_cache[3] = ($event = null) => {
              return handler("/pages/question-ans/index");
            })
          }), "答疑"),
          vue.createElementVNode("button", new UTSJSONObject({
            onClick: _cache[4] || (_cache[4] = ($event = null) => {
              return handler("/pages/note/index");
            })
          }), "笔记")
        ]);
      };
    }
  });
  const _style_0$u = { "color": { "": { "backgroundColor": "#000000" } }, "text": { ".color ": { "color": "#ff0000" } } };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["styles", [_style_0$u]]]);
  const _sfc_main$u = /* @__PURE__ */ vue.defineComponent({
    __name: "c-tab",
    props: {
      list: {
        type: Array,
        required: true
      },
      defaultIndex: {
        type: Number,
        default: 0
      }
    },
    emits: ["change"],
    setup(__props, _a) {
      var __emit = _a.emit;
      const props = __props;
      const emit = __emit;
      const activeIndex = vue.ref(0);
      vue.onBeforeMount(() => {
        activeIndex.value = props.defaultIndex;
      });
      const change = (item, index) => {
        if (activeIndex.value == index)
          return null;
        activeIndex.value = index;
        emit("change", item, index);
      };
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "list" }), [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.list, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
              class: "item",
              key: index,
              onClick: ($event = null) => {
                return change(item, index);
              }
            }), [
              vue.createElementVNode("text", new UTSJSONObject({
                class: vue.normalizeClass(["text", new UTSJSONObject({ active: index == vue.unref(activeIndex) })])
              }), vue.toDisplayString(item["name"]), 3)
            ], 8, ["onClick"]);
          }), 128))
        ]);
      };
    }
  });
  const _style_0$t = { "list": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "item": { "": { "paddingTop": "0rpx", "paddingRight": "8rpx", "paddingBottom": "0rpx", "paddingLeft": "8rpx" } }, "text": { ".item ": { "fontWeight": "bold", "fontSize": "13rpx", "color": "rgba(0,1,15,0.6)", "lineHeight": "20rpx" } }, "active": { ".item ": { "fontSize": "15rpx", "color": "#00010F" } } };
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["styles", [_style_0$t]]]);
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const _imports_0$d = "/static/images/ico-back.svg";
  const _sfc_main$t = /* @__PURE__ */ vue.defineComponent({
    __name: "c-navbar",
    props: ["title"],
    setup(__props) {
      const sysInfo = uni.getSystemInfoSync();
      const statusBarHeight = sysInfo.statusBarHeight;
      const navbarContentHeight = uni.rpx2px(44) < 44 ? 44 : uni.rpx2px(44);
      const navbarTotalHeight = navbarContentHeight + statusBarHeight;
      const goBack = () => {
        const pages = getCurrentPages();
        if (pages.length <= 1) {
          router.app(new RouterOptions({
            url: "app://uniappx/back"
          }));
          return null;
        }
        router.go(-1);
      };
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "navbar" }), [
          vue.createElementVNode("view", new UTSJSONObject({
            class: "navbar-blank",
            style: vue.normalizeStyle({ height: navbarTotalHeight + "px" })
          }), null, 4),
          vue.createElementVNode("view", new UTSJSONObject({
            class: "navbar-fix",
            style: vue.normalizeStyle({ "padding-top": vue.unref(statusBarHeight) + "px" })
          }), [
            vue.createElementVNode("view", new UTSJSONObject({
              class: "navbar-content",
              style: vue.normalizeStyle({ height: vue.unref(navbarContentHeight) + "px" })
            }), [
              vue.createElementVNode("view", new UTSJSONObject({
                class: "back",
                onClick: goBack
              }), [
                vue.createElementVNode("image", new UTSJSONObject({
                  class: "ico",
                  src: _imports_0$d
                }))
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "content" }), [
                vue.renderSlot(_ctx.$slots, "default", new UTSJSONObject({}), () => {
                  return [
                    vue.createElementVNode("text", new UTSJSONObject({ class: "title" }), vue.toDisplayString(__props.title), 1)
                  ];
                })
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "navbar-right" }), [
                vue.renderSlot(_ctx.$slots, "navbar-right")
              ])
            ], 4)
          ], 4)
        ]);
      };
    }
  });
  const _style_0$s = { "navbar": { "": { "flexShrink": 0 } }, "navbar-fix": { "": { "display": "flex", "flexDirection": "row", "position": "fixed", "left": 0, "top": 0, "width": "100%", "zIndex": 1 } }, "navbar-content": { "": { "position": "relative", "paddingTop": 0, "paddingRight": "16.67rpx", "paddingBottom": 0, "paddingLeft": "16.67rpx", "width": "100%", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center" } }, "back": { ".navbar-content ": { "width": "23rpx", "height": "23rpx", "position": "absolute", "left": "16rpx", "top": "50%", "transform": "translateY(-50%)", "zIndex": 1 } }, "ico": { ".navbar-content .back ": { "width": "100%", "height": "100%" } }, "content": { ".navbar-content ": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "flexDirection": "row", "justifyContent": "center" } }, "title": { ".navbar-content .content ": { "fontWeight": "700", "fontSize": "15rpx", "color": "#00010F", "lineHeight": "21rpx" } }, "navbar-right": { ".navbar-content ": { "position": "absolute", "right": "23rpx", "top": 0, "height": "100%", "display": "flex", "flexDirection": "row", "alignItems": "center" } } };
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["styles", [_style_0$s]]]);
  class RespType extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            data: { type: "Unknown", optional: false },
            status: { type: "Unknown", optional: false }
          };
        }
      };
    }
    constructor(options, metadata = RespType.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.data = this.__props__.data;
      this.status = this.__props__.status;
      delete this.__props__;
    }
  }
  class Http {
    constructor(options = new UTSJSONObject({})) {
      this.requestTaskMap = /* @__PURE__ */ new Map();
      this.uploadTaskMap = /* @__PURE__ */ new Map();
      this.interceptorsRequestList = [];
      this.interceptorsReponseList = [];
      this.options = new UTSJSONObject({
        timeout: 60 * 1e3
      });
      this.options = new UTSJSONObject(Object.assign(Object.assign({}, this.options), options));
    }
    request(method, url, data = new UTSJSONObject({}), options = new UTSJSONObject({})) {
      let config = new UTSJSONObject(Object.assign(Object.assign(Object.assign({}, this.options), options), {
        url,
        method,
        data,
        header: new UTSJSONObject({})
      }));
      this.interceptorsRequestList.forEach((fn) => {
        config = new UTSJSONObject(Object.assign(Object.assign({}, config), fn(config)));
      });
      let _data = UTSJSONObject.assign(new UTSJSONObject({}), config.data);
      let _header = UTSJSONObject.assign(new UTSJSONObject({}), config.header);
      return new Promise((resolve, reject) => {
        let requestTask = uni.request({
          method: config.method.toUpperCase(),
          url: config.url,
          timeout: config.timeout,
          data: _data,
          header: _header,
          enableChunked: config.enableChunked == true ? true : false,
          success: (res) => {
            let resp = res.data;
            if (config.enableChunked == true) {
              uni.__log__("log", "at utils/request.uts:49", "请求结束");
            } else {
              this.interceptorsReponseList.forEach((fn) => {
                resp = fn(resp, config);
              });
            }
            resolve(resp);
          },
          fail: (err) => {
            uni.__log__("error", "at utils/request.uts:58", "[http] request fail", new UTSJSONObject({
              url: config.url,
              method: config.method,
              data: _data,
              error: err
            }));
            reject(err);
          },
          complete: () => {
            if (config.httpTaskKey != null) {
              this.requestTaskMap.delete(config.httpTaskKey);
            }
          }
        });
        if (config.httpTaskKey != null) {
          this.requestTaskMap.set(config.httpTaskKey, requestTask);
        }
      });
    }
    get(url, data = new UTSJSONObject({}), options = new UTSJSONObject({})) {
      return this.request("get", url, data, options);
    }
    post(url, data = new UTSJSONObject({}), options = new UTSJSONObject({})) {
      return this.request("post", url, data, options);
    }
    delete(url, data = new UTSJSONObject({}), options = new UTSJSONObject({})) {
      return this.request("delete", url, data, options);
    }
    upload(url, data = new UTSJSONObject({}), options = new UTSJSONObject({})) {
      let config = new UTSJSONObject(Object.assign(Object.assign(Object.assign({}, this.options), options), {
        url,
        data,
        header: new UTSJSONObject({})
      }));
      this.interceptorsRequestList.forEach((fn) => {
        config = new UTSJSONObject(Object.assign(Object.assign({}, config), fn(config)));
      });
      let _data = UTSJSONObject.assign(new UTSJSONObject({}), config.data);
      let _header = UTSJSONObject.assign(new UTSJSONObject({}), config.header);
      return new Promise((resolve, reject) => {
        var _a;
        let uploadTask = uni.uploadFile({
          url: config.url,
          // timeout:config.timeout as number,
          filePath: config.filePath,
          name: (_a = config.name) !== null && _a !== void 0 ? _a : "file",
          formData: _data,
          header: _header,
          success: (res) => {
            let resp = res.data;
            if (typeof resp == "string") {
              resp = UTS.JSON.parse(resp);
            }
            this.interceptorsReponseList.forEach((fn) => {
              resp = fn(resp, config);
            });
            resolve(resp);
          },
          fail: (err) => {
            uni.__log__("error", "at utils/request.uts:121", "[http] upload fail", new UTSJSONObject({
              url: config.url,
              method: "upload",
              data: _data,
              error: err
            }));
            reject(err);
          },
          complete: () => {
            if (config.httpTaskKey != null) {
              this.uploadTaskMap.delete(config.httpTaskKey);
            }
          }
        });
        if (config.httpTaskKey != null) {
          this.uploadTaskMap.set(config.httpTaskKey, uploadTask);
        }
      });
    }
    interceptorsRequest(fn) {
      this.interceptorsRequestList.push(fn);
    }
    interceptorsResponse(fn) {
      this.interceptorsReponseList.push(fn);
    }
  }
  const http = new Http(new UTSJSONObject({
    timeout: 5e3
  }));
  const apiMap = new UTSJSONObject({
    api: "https://api.hqwx.com",
    japi: "https://japi.hqwx.com",
    ai: "https://ai.hqwx.com",
    kjapi: "https://kjapi.hqwx.com"
  });
  const token = "3482fe0c87cf0548b8768ab329a8f46cbc3b0fd4ebd558c2cf72e4eb4067b67bb2e0afab7350c724721da3d467157279f3f493723d199edf57d1cc7726817bf61a88a1908ecbddb87e98c0f5fb37b715e0";
  function createPublicData() {
    const defaultData = new UTSJSONObject({
      appid: "wwwedu24ol",
      _appid: "wwwedu24ol",
      passport: token,
      edu24ol_token: token,
      org_id: 2,
      schId: 2,
      pschId: 14,
      platform: "web"
    });
    let platformData = new UTSJSONObject({});
    try {
      platformData = getPublicParams();
    } catch (e) {
      uni.__log__("error", "at utils/http.uts:38", "[http] getPublicParams failed", e);
    }
    return new UTSJSONObject(Object.assign(Object.assign(Object.assign({}, defaultData), platformData), { _t: Date.now(), _v: "1.0.0" }));
  }
  function withUrl(url) {
    if (url.startsWith("http"))
      return url;
    for (let key in apiMap) {
      if (url.startsWith(key) || url.startsWith("/" + key)) {
        if (url.startsWith("/"))
          url = url.substring(1);
        return "".concat(apiMap[key]).concat(url.substring(key.length));
      }
    }
    return url;
  }
  function respDataAsArray(res = null) {
    var _a, _b;
    let list = (_b = (_a = res) === null || _a === void 0 ? null : _a.data) !== null && _b !== void 0 ? _b : new Array();
    return list;
  }
  function respDataAsObject(res = null) {
    var _a, _b;
    let data = (_b = (_a = res) === null || _a === void 0 ? null : _a.data) !== null && _b !== void 0 ? _b : new UTSJSONObject({});
    return data;
  }
  function respDataAsType(res = null) {
    let data = res.data;
    return data;
  }
  function respStatusAsObject(res = null) {
    var _a, _b;
    let status = (_b = (_a = res) === null || _a === void 0 ? null : _a.status) !== null && _b !== void 0 ? _b : new UTSJSONObject({});
    return status;
  }
  http.interceptorsRequest((config) => {
    config.url = withUrl(config.url);
    let header = config.header;
    config.data = new UTSJSONObject(Object.assign(Object.assign({}, createPublicData()), config.data));
    header["Content-Type"] = "application/json";
    if (config.method == "post") {
      header["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (config.method == "delete" && config.url.indexOf("/uc/user-study-note/delete") > -1) {
      config.url = config.url + "?" + qs.stringify(config.data);
      header["Content-Type"] = "application/x-www-form-urlencoded";
      config.data = new UTSJSONObject({});
    }
    config.header = header;
    return config;
  });
  http.interceptorsResponse((res = null, config) => {
    let status = respStatusAsObject(res);
    if (status["code"] != 0) {
      uni.__log__("error", "at utils/http.uts:106", "[http] response status error", new UTSJSONObject({
        url: config.url,
        method: config.method,
        data: config.data,
        status
      }));
      return Promise.reject(status["msg"]);
    }
    return res;
  });
  let State$1 = class State2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            isAl: { type: "Unknown", optional: false },
            goodsId: { type: "Unknown", optional: false },
            categoryId: { type: "Unknown", optional: false },
            categoryList: { type: "Unknown", optional: false },
            activeCategory: { type: "Unknown", optional: false }
          };
        }
      };
    }
    constructor(options, metadata = State2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.isAl = this.__props__.isAl;
      this.goodsId = this.__props__.goodsId;
      this.categoryId = this.__props__.categoryId;
      this.categoryList = this.__props__.categoryList;
      this.activeCategory = this.__props__.activeCategory;
      delete this.__props__;
    }
  };
  const state$1 = vue.reactive(new State$1({
    isAl: 1,
    goodsId: "",
    categoryId: "",
    categoryList: [],
    activeCategory: new UTSJSONObject({})
  }));
  const categoryChange = (item) => {
    if (state$1.categoryId == item.categoryId)
      return null;
    state$1.categoryId = item.categoryId;
    state$1.activeCategory = item;
  };
  const categoryInitState = (options) => {
    return new Promise((resolve, reject) => {
      if (options.goodsId == null) {
        uni.showToast({
          title: "缺少goodsId参数",
          icon: "error"
        });
        reject("缺少goodsId");
      }
      if (options.isAl != null) {
        state$1.isAl = parseInt(options.isAl);
      }
      if (options.categoryId != null) {
        state$1.categoryId = options.categoryId;
      }
      if (options.goodsId == state$1.goodsId && state$1.categoryList.length > 0) {
        if (options.categoryId != null) {
          let findex = state$1.categoryList.findIndex((v) => {
            return v.categoryId == parseInt(options.categoryId);
          });
          uni.__log__("log", "at store/category.uts:44", 11, findex);
          state$1.activeCategory = state$1.categoryList[findex];
        }
        resolve(state$1.activeCategory);
      } else {
        state$1.goodsId = options.goodsId;
        if (state$1.isAl == 0) {
          getCategoryList2(resolve, reject, options);
        } else {
          getCategoryList(resolve, reject);
        }
      }
    });
  };
  function getCategoryList(resolve, reject) {
    let data = new UTSJSONObject({
      goodsId: state$1.goodsId
    });
    http.get("/japi/al/userCategory/list", data).then((res = null) => {
      let list = respDataAsArray(res);
      state$1.categoryList = list;
      if (list.length > 0) {
        let i = 0;
        list.forEach((item, index) => {
          if (item.categoryId == state$1.categoryId) {
            i = index;
          }
        });
        state$1.categoryId = list[i].categoryId;
        state$1.activeCategory = list[i];
        resolve(state$1.activeCategory);
      } else {
        uni.showToast({
          title: "科目列表为空",
          icon: "error"
        });
        reject("科目列表为空");
      }
    });
  }
  function getCategoryList2(resolve, reject, options) {
    let data = new UTSJSONObject({
      goodsId: state$1.goodsId,
      buyType: options.buyType
    });
    http.get("/japi/uc/study/listUserGoodsPlanTotalCategorySort", data).then((res = null) => {
      let list = respDataAsArray(res);
      state$1.categoryList = list;
      if (list.length > 0) {
        let i = 0;
        list.forEach((item, index) => {
          item.categoryId = item.category;
          item.categoryAlias = item.categoryName;
          item.categoryName = item.categoryFullName;
          item.secondCategoryId = item.secondCategory;
          if (item.categoryId == state$1.categoryId) {
            i = index;
          }
        });
        state$1.categoryId = list[i].categoryId;
        state$1.activeCategory = list[i];
        resolve(state$1.activeCategory);
      } else {
        uni.showToast({
          title: "科目列表为空",
          icon: "error"
        });
        reject("科目列表为空");
      }
    });
  }
  const _sfc_main$s = /* @__PURE__ */ vue.defineComponent({
    __name: "c-category-tab",
    props: {
      firstIndent: {
        type: String,
        default: "0rpx"
      },
      space: {
        type: String,
        default: "13rpx"
      }
    },
    emits: ["change"],
    setup(__props, _a) {
      var __emit = _a.emit;
      const emit = __emit;
      const change = (item) => {
        categoryChange(item);
        emit("change", item);
      };
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "list" }), [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(state$1).categoryList, (item, index) => {
            var _a2;
            return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
              class: "item",
              key: item.categoryId,
              onClick: ($event = null) => {
                return change(item);
              }
            }), [
              vue.createElementVNode("text", new UTSJSONObject({
                class: vue.normalizeClass(["text", new UTSJSONObject({ active: item.categoryId == vue.unref(state$1).activeCategory.categoryId })]),
                style: vue.normalizeStyle({ padding: index == 0 ? "0 ".concat(__props.space, " 0 ").concat(__props.firstIndent) : "0 ".concat(__props.space) })
              }), vue.toDisplayString((_a2 = item["categoryAlias"]) !== null && _a2 !== void 0 ? _a2 : item["categoryName"]), 7)
            ], 8, ["onClick"]);
          }), 128))
        ]);
      };
    }
  });
  const _style_0$r = { "list": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "height": "17rpx" } }, "text": { ".item ": { "fontWeight": "bold", "fontSize": "13rpx", "color": "#6B6C87", "lineHeight": "17rpx" } }, "active": { ".item ": { "fontSize": "13rpx", "color": "#00010F" } } };
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["styles", [_style_0$r]]]);
  const _imports_0$c = "/static/images/page-bg.png";
  const _imports_1$8 = "/static/images/ico-chart-line.png";
  function timeFormat(timestamp, fmt = "yyyy-mm-dd") {
    let rfmt = fmt;
    let ts = timestamp;
    if (ts.toString().length == 10)
      ts *= 1e3;
    let date = new Date(ts);
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    let hour = date.getHours().toString().padStart(2, "0");
    let minute = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");
    rfmt = rfmt.replace("yyyy", year);
    rfmt = rfmt.replace("mm", month);
    rfmt = rfmt.replace("dd", day);
    rfmt = rfmt.replace("hh", hour);
    rfmt = rfmt.replace("MM", minute);
    rfmt = rfmt.replace("ss", second);
    return rfmt;
  }
  function formatNumer(n) {
    if (n < 10) {
      return "0".concat(n);
    }
    return n;
  }
  class StreamMessage extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            event: { type: String, optional: false },
            data: { type: "Unknown", optional: false }
          };
        }
      };
    }
    constructor(options, metadata = StreamMessage.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.event = this.__props__.event;
      this.data = this.__props__.data;
      delete this.__props__;
    }
  }
  function streamDecoder(requestTask, message) {
    requestTask.onChunkReceived((res) => {
      const chunkText = new TextDecoder().decode(res.data);
      const lines = chunkText.trim().split("\n");
      let eventType = "", jsonData = null;
      lines.forEach((line) => {
        if (line.startsWith("event:")) {
          eventType = line.substring(6).trim();
        } else if (line.startsWith("data:")) {
          const dataStr = line.substring(5).trim();
          if (dataStr != "") {
            try {
              jsonData = UTS.JSON.parse(dataStr);
            } catch (error) {
              uni.__log__("error", "at utils/tools.uts:54", "JSON解析失败:", error);
            }
          }
          if (jsonData != null) {
            message(new StreamMessage({
              event: eventType,
              data: jsonData
            }));
          }
        }
      });
    });
  }
  function richTextAddInlineStyles(htmlString, styles) {
    const defaultStyles = new UTSJSONObject({});
    const finalStyles = new UTSJSONObject(Object.assign(Object.assign({}, defaultStyles), styles));
    for (let tag in finalStyles) {
      let style = finalStyles[tag];
      const regex = new RegExp("<".concat(tag, "(?!\\sstyle=)"), "gi");
      htmlString = htmlString.replace(regex, "<".concat(tag, ' style="').concat(style, '"'));
    }
    return htmlString;
  }
  function handleAppAction(action = "", params = null) {
    const safeAction = action !== null && action !== void 0 ? action : "";
    const safeParams = params !== null && params !== void 0 ? params : new UTSJSONObject();
    uni.__log__("log", "at utils/tools.uts:87", "调用原生方法", safeAction);
    handleAction(safeAction, safeParams);
  }
  const _sfc_main$r = /* @__PURE__ */ vue.defineComponent({
    __name: "c-loading",
    setup(__props) {
      const isRun = vue.ref(false);
      vue.onMounted(() => {
        setTimeout(() => {
          isRun.value = true;
        }, 100);
      });
      vue.onBeforeUnmount(() => {
        isRun.value = false;
      });
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "loading-spinning" }), [
          vue.createElementVNode("view", new UTSJSONObject({
            class: vue.normalizeClass(["dot-spin", new UTSJSONObject({ active: vue.unref(isRun) })])
          }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "dot-item dot-item-1" })),
            vue.createElementVNode("view", new UTSJSONObject({ class: "dot-item dot-item-2" })),
            vue.createElementVNode("view", new UTSJSONObject({ class: "dot-item dot-item-3" })),
            vue.createElementVNode("view", new UTSJSONObject({ class: "dot-item dot-item-4" }))
          ], 2)
        ]);
      };
    }
  });
  const _style_0$q = { "loading-spinning": { "": { "position": "absolute", "left": 0, "top": 0, "width": "100%", "height": "100%", "zIndex": 9 } }, "dot-spin": { "": { "position": "relative", "left": "50%", "top": "50%", "marginLeft": "-8rpx", "marginTop": "-8rpx", "transform": "rotate(45deg)", "width": "16rpx", "height": "16rpx", "transitionProperty": "all", "transitionDuration": "30s", "transitionTimingFunction": "linear", "transformOrigin": "center center", "overflow": "visible" }, ".active": { "transform": "rotate(9000deg)" } }, "dot-item": { "": { "position": "absolute", "width": "5.5rpx", "height": "5.5rpx", "backgroundColor": "#4F46E5", "transformOrigin": "50% 50%" } }, "dot-item-1": { "": { "left": 0, "top": 0, "opacity": 0.3 } }, "dot-item-2": { "": { "top": 0, "right": 0, "opacity": 0.5 } }, "dot-item-3": { "": { "right": 0, "bottom": 0, "opacity": 0.8 } }, "dot-item-4": { "": { "left": 0, "bottom": 0, "opacity": 0.95 } }, "@TRANSITION": { "dot-spin": { "property": "all", "duration": "30s", "timingFunction": "linear" } } };
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["styles", [_style_0$q]]]);
  const _imports_0$b = "/static/images/nothing-pic.png";
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
    __name: "c-empty",
    props: {
      textColor: {
        type: String,
        default: " #747491"
      }
    },
    setup(__props) {
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "empty" }), [
          vue.createElementVNode("image", new UTSJSONObject({
            class: "pic",
            src: _imports_0$b,
            mode: "widthFix"
          })),
          vue.createElementVNode("text", new UTSJSONObject({
            class: "t",
            style: vue.normalizeStyle({ color: __props.textColor })
          }), [
            vue.renderSlot(_ctx.$slots, "default", new UTSJSONObject({}), () => {
              return [
                vue.createTextVNode("暂无内容～")
              ];
            })
          ], 4)
        ]);
      };
    }
  });
  const _style_0$p = { "empty": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "display": "flex", "justifyContent": "center", "alignItems": "center", "transform": "translateY(-15%)" } }, "pic": { ".empty ": { "width": "64rpx" } }, "t": { ".empty ": { "paddingTop": "8rpx", "fontSize": "9rpx", "color": "#747491", "lineHeight": "10rpx" } } };
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["styles", [_style_0$p]]]);
  const _imports_0$a = "/static/images/study-report-rank-bg.png";
  const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
    __name: "rank",
    setup(__props) {
      const initId = vue.inject("initId", vue.ref(0));
      const cycleTypeList = ["总", "周"];
      const rankTypeList = ["学习时长排行", "答题量排行"];
      const cycleType = vue.ref(0);
      const rankType = vue.ref(0);
      const rankList = vue.ref([]);
      const selfRank = vue.ref(null);
      const avgSchoolStudyLengthText = vue.ref(0);
      const avgSchoolQuestionNum = vue.ref(0);
      const isLoading = vue.ref(true);
      const formatData = (item) => {
        if (item.me == true) {
          item.nickName = item.nickName + "(我)";
        }
        if (rankType.value == 0) {
          let studyLength = item.studyLength;
          item.unit = studyLength < 60 ? "分钟" : "小时";
          item.number = studyLength < 60 ? studyLength : (studyLength / 60).toFixed(1);
        } else {
          item.unit = "道";
          item.number = item.questionNum;
        }
        return item;
      };
      const getList = () => {
        let data = new UTSJSONObject({
          goodsId: state$1.goodsId,
          categoryId: state$1.activeCategory.categoryId,
          productId: state$1.activeCategory.productId,
          cycleType: cycleType.value,
          rankType: rankType.value
          //0时长榜1:答题榜
        });
        isLoading.value = true;
        http.get("/japi/al/v7/studyReport/studentRank", data).then((res = null) => {
          isLoading.value = false;
          let info = res["data"];
          if (info != null && UTS.isInstanceOf(info, UTSJSONObject)) {
            let info2 = info;
            let list = info2.studyRankInfoList;
            let is = false, findex = -1;
            avgSchoolStudyLengthText.value = (info2.avgSchoolStudyLength / 60).toFixed(1);
            avgSchoolQuestionNum.value = info2.avgSchoolQuestionNum;
            list.map((item, index) => {
              if (!is) {
                if (rankType.value == 0) {
                  is = info2.avgSchoolStudyLength > item.studyLength;
                }
                if (rankType.value == 1) {
                  is = info2.avgSchoolQuestionNum > item.questionNum;
                }
              }
              if (is) {
                findex = index;
              }
              return formatData(item);
            });
            if (findex != -1) {
              let lineItem = new UTSJSONObject({
                isLine: true
              });
              if (findex != -1) {
                list.splice(findex, 0, lineItem);
              }
            }
            if (info2.meRankInfo != null) {
              selfRank.value = formatData(info2.meRankInfo);
            } else {
              selfRank.value = null;
            }
            rankList.value = list;
          } else {
            selfRank.value = null;
            rankList.value = [];
          }
        });
      };
      const change = (type, index) => {
        if (type == "cycleType") {
          if (cycleType.value == index)
            return null;
          cycleType.value = index;
        }
        if (type == "rankType") {
          if (rankType.value == index)
            return null;
          rankType.value = index;
        }
        getList();
      };
      const stop = vue.watch(initId, () => {
        if (state$1.activeCategory.categoryId != null) {
          getList();
        }
      }, { immediate: true });
      vue.onBeforeUnmount(() => {
        stop();
      });
      return (_ctx = null, _cache = null) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const _component_c_loading = resolveEasycom(vue.resolveDynamicComponent("c-loading"), __easycom_0$1);
        const _component_c_empty = resolveEasycom(vue.resolveDynamicComponent("c-empty"), __easycom_6);
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "rank" }), [
          vue.createElementVNode("image", new UTSJSONObject({
            class: "bg",
            mode: "widthFix",
            src: _imports_0$a
          })),
          vue.createElementVNode("view", new UTSJSONObject({ class: "header" }), [
            vue.createElementVNode("text", new UTSJSONObject({ class: "title" }), "学霸榜单"),
            vue.createElementVNode("view", new UTSJSONObject({ class: "list" }), [
              (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(cycleTypeList, (item, index) => {
                return vue.createElementVNode("text", new UTSJSONObject({
                  class: vue.normalizeClass(["item", new UTSJSONObject({ active: vue.unref(cycleType) == index })]),
                  key: index,
                  onClick: ($event = null) => {
                    return change("cycleType", index);
                  }
                }), vue.toDisplayString(item), 11, ["onClick"]);
              }), 64))
            ])
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "tab-list" }), [
            (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(rankTypeList, (item, index) => {
              return vue.createElementVNode("text", new UTSJSONObject({
                class: vue.normalizeClass(["item", new UTSJSONObject({ active: vue.unref(rankType) == index })]),
                key: index,
                onClick: ($event = null) => {
                  return change("rankType", index);
                }
              }), vue.toDisplayString(item), 11, ["onClick"]);
            }), 64))
          ]),
          vue.createElementVNode("scroll-view", new UTSJSONObject({ style: new UTSJSONObject({ "flex": "1" }) }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "rank-list" }), [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(rankList), (item, index) => {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                  item.isLine ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    class: "divider-line",
                    key: "line"
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "line" })),
                    vue.unref(rankType) == 0 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, new UTSJSONObject({ key: 0 }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "当前平均学习时长 " + vue.toDisplayString(vue.unref(avgSchoolStudyLengthText)), 1),
                      vue.createElementVNode("text", new UTSJSONObject({ class: "unit" }), "小时")
                    ], 64)) : vue.createCommentVNode("", true),
                    vue.unref(rankType) == 1 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, new UTSJSONObject({ key: 1 }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "当前平均做题数量 " + vue.toDisplayString(vue.unref(avgSchoolQuestionNum)), 1),
                      vue.createElementVNode("text", new UTSJSONObject({ class: "unit" }), "道")
                    ], 64)) : vue.createCommentVNode("", true),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "line" }))
                  ])) : (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    class: "rank-item",
                    key: index
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "sort" }), [
                      item.rank > 3 ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                        key: 0,
                        class: "text"
                      }), vue.toDisplayString(item.rank), 1)) : (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                        key: 1,
                        class: "sort-img",
                        src: "/static/images/ico-rank-0".concat(item.rank, ".png")
                      }), null, 8, ["src"]))
                    ]),
                    vue.createElementVNode("image", new UTSJSONObject({
                      class: "pic",
                      src: item.avatarUrl
                    }), null, 8, ["src"]),
                    vue.createElementVNode("text", new UTSJSONObject({ class: "name" }), vue.toDisplayString(item.nickName), 1),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "count" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "number" }), vue.toDisplayString(item.number), 1),
                      vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), vue.toDisplayString(item.unit), 1)
                    ])
                  ]))
                ], 64);
              }), 256))
            ]),
            vue.unref(isLoading) ? (vue.openBlock(), vue.createBlock(_component_c_loading, new UTSJSONObject({ key: 0 }))) : vue.createCommentVNode("", true),
            !vue.unref(isLoading) && vue.unref(rankList).length == 0 ? (vue.openBlock(), vue.createBlock(_component_c_empty, new UTSJSONObject({
              key: 1,
              "text-color": "#010B16"
            }), new UTSJSONObject({
              default: vue.withCtx(() => {
                return [
                  vue.createTextVNode(" 排行榜暂未生成 ")
                ];
              }),
              _: 1
            }))) : vue.createCommentVNode("", true)
          ]),
          vue.unref(selfRank) != null ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
            key: 0,
            class: "rank-self rank-item"
          }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "sort" }), [
              ((_a = vue.unref(selfRank)) === null || _a === void 0 ? null : _a.rank) > 3 ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                key: 0,
                class: "text"
              }), vue.toDisplayString((_b = vue.unref(selfRank)) === null || _b === void 0 ? null : _b.rank), 1)) : ((_c = vue.unref(selfRank)) === null || _c === void 0 ? null : _c.rank) == 0 ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                key: 1,
                class: "text"
              }), "未上榜")) : (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                key: 2,
                class: "sort-img",
                src: "/static/images/ico-rank-0".concat((_d = vue.unref(selfRank)) === null || _d === void 0 ? null : _d.rank, ".png")
              }), null, 8, ["src"]))
            ]),
            vue.createElementVNode("image", new UTSJSONObject({
              class: "pic",
              src: (_e = vue.unref(selfRank)) === null || _e === void 0 ? null : _e.avatarUrl
            }), null, 8, ["src"]),
            vue.createElementVNode("text", new UTSJSONObject({ class: "name" }), vue.toDisplayString((_f = vue.unref(selfRank)) === null || _f === void 0 ? null : _f.nickName), 1),
            vue.createElementVNode("view", new UTSJSONObject({ class: "count" }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "number" }), vue.toDisplayString((_g = vue.unref(selfRank)) === null || _g === void 0 ? null : _g.number), 1),
              vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), vue.toDisplayString((_h = vue.unref(selfRank)) === null || _h === void 0 ? null : _h.unit), 1)
            ])
          ])) : vue.createCommentVNode("", true)
        ]);
      };
    }
  });
  const _style_0$o = { "rank": { "": { "backgroundImage": "linear-gradient(225deg, #F4F3FF, #FAF9FF)", "backgroundColor": "rgba(0,0,0,0)", "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#FFFFFF", "borderRightColor": "#FFFFFF", "borderBottomColor": "#FFFFFF", "borderLeftColor": "#FFFFFF", "borderTopLeftRadius": "6rpx", "borderTopRightRadius": "6rpx", "borderBottomRightRadius": "6rpx", "borderBottomLeftRadius": "6rpx", "paddingTop": "12rpx", "paddingRight": 0, "paddingBottom": "8rpx", "paddingLeft": 0 } }, "bg": { ".rank ": { "width": "100%", "position": "absolute", "left": 0, "top": 0 } }, "header": { "": { "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "paddingTop": 0, "paddingRight": "12rpx", "paddingBottom": 0, "paddingLeft": "12rpx", "marginBottom": "11rpx" } }, "title": { ".header ": { "fontWeight": "700", "fontSize": "10rpx", "color": "#171921", "lineHeight": "15rpx" } }, "list": { ".header ": { "flexDirection": "row", "width": "46rpx", "height": "16rpx", "backgroundImage": "none", "backgroundColor": "#EFEEF7", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "4rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": "4rpx", "paddingTop": "1rpx", "paddingRight": "1rpx", "paddingBottom": "1rpx", "paddingLeft": "1rpx" } }, "item": { ".header .list ": { "width": "50%", "fontSize": "7rpx", "color": "#8B8FA1", "lineHeight": "14rpx", "borderTopLeftRadius": "3rpx", "borderTopRightRadius": "3rpx", "borderBottomRightRadius": "3rpx", "borderBottomLeftRadius": "3rpx", "textAlign": "center" }, ".header .list .active": { "backgroundImage": "none", "backgroundColor": "#FFFFFF", "color": "#525EFB" }, ".tab-list ": { "fontSize": "9rpx", "color": "#8C8E9F", "lineHeight": "13rpx", "marginRight": "16rpx", "marginRight:last-child": 0 }, ".tab-list .active": { "color": "#010B16", "fontWeight": "700" } }, "tab-list": { "": { "flexDirection": "row", "paddingTop": 0, "paddingRight": "12rpx", "paddingBottom": 0, "paddingLeft": "12rpx", "marginBottom": "12rpx" } }, "rank-list": { "": { "paddingTop": 0, "paddingRight": "12rpx", "paddingBottom": 0, "paddingLeft": "9rpx" } }, "rank-item": { "": { "flexDirection": "row", "alignItems": "center", "marginBottom": "12rpx" }, ".rank-self": { "backgroundColor": "#FFFFFF", "borderTopLeftRadius": "5rpx", "borderTopRightRadius": "5rpx", "borderBottomRightRadius": "5rpx", "borderBottomLeftRadius": "5rpx", "paddingTop": "4rpx", "paddingRight": "4rpx", "paddingBottom": "4rpx", "paddingLeft": "4rpx", "marginTop": 0, "marginRight": "8rpx", "marginBottom": 0, "marginLeft": "8rpx" } }, "sort": { ".rank-item ": { "width": "13rpx", "marginRight": "4rpx" }, ".rank-item.rank-self ": { "minWidth": "10rpx", "width": "auto" } }, "text": { ".rank-item .sort ": { "textAlign": "center", "fontWeight": "700", "fontSize": "8rpx", "color": "#171921" }, ".rank-item .count ": { "fontSize": "8rpx", "color": "#747491" }, ".rank-item.rank-self .sort ": { "textAlign": "left" }, ".nothing ": { "fontWeight": "700", "fontSize": "8rpx", "color": "#010B16", "lineHeight": 1.5 }, ".divider-line ": { "fontSize": "7rpx", "color": "#171921", "lineHeight": "10rpx" } }, "sort-img": { ".rank-item .sort ": { "width": "13rpx", "height": "12rpx" } }, "pic": { ".rank-item ": { "width": "17rpx", "height": "17rpx", "borderTopLeftRadius": "8rpx", "borderTopRightRadius": "8rpx", "borderBottomRightRadius": "8rpx", "borderBottomLeftRadius": "8rpx", "marginRight": "8rpx" } }, "name": { ".rank-item ": { "fontSize": "8rpx", "color": "#747491" }, ".rank-item.rank-self ": { "color": "#525EFB" } }, "count": { ".rank-item ": { "flexDirection": "row", "marginLeft": "auto" } }, "number": { ".rank-item .count ": { "fontWeight": "700", "fontSize": "8rpx", "color": "#171921" } }, "nothing": { "": { "alignItems": "center", "marginTop": "60rpx" } }, "image": { ".nothing ": { "width": "60rpx", "marginBottom": "10rpx" } }, "divider-line": { "": { "flexDirection": "row", "alignItems": "center", "marginBottom": "12rpx" } }, "unit": { ".divider-line ": { "fontSize": "7rpx", "color": "#747491", "lineHeight": "10rpx" } }, "line": { ".divider-line ": { "marginTop": 0, "marginRight": "4rpx", "marginBottom": 0, "marginLeft": "4rpx", "height": 0, "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "borderBottomWidth": "1rpx", "borderBottomStyle": "dashed", "borderBottomColor": "#979797" } } };
  const rank = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["styles", [_style_0$o]]]);
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step2(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step2(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step2(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step2((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  class Echarts {
    constructor(context) {
      this.options = new UTSJSONObject({});
      this.eventMap = /* @__PURE__ */ new Map();
      this.temp = [];
      this.context = context;
      this.init();
    }
    init() {
      this.context.evalJS("init(null, null, ".concat(UTS.JSON.stringify(new UTSJSONObject({})), ")"));
      this.context.addEventListener("message", (e) => {
        const detail = e.detail.data[0];
        const file = detail.getString("file");
        const data = detail.get("data");
        const key = detail.getString("event");
        const options = typeof data == "object" ? data.getJSON("options") : null;
        const event = typeof data == "object" ? data.getString("event") : null;
        if (key == "log" && data != null) {
          uni.__log__("log", "at uni_modules/lime-echart/components/l-echart/uvue.uts:29", data);
        }
        if (event != null && options != null) {
          this.dispatchAction(event.replace(/"/g, ""), options);
        }
        if (file != null) {
          while (this.temp.length > 0) {
            const opt = UTS.arrayPop(this.temp);
            const success = opt === null || opt === void 0 ? null : opt.get("success");
            if (typeof success == "function") {
              success(new UTSJSONObject({ tempFilePath: file }));
            }
          }
        }
      });
    }
    setOption(option) {
      this.options = option;
      this.context.evalJS("setOption(".concat(UTS.JSON.stringify([option]), ")"));
    }
    setOption(option, notMerge = false, lazyUpdate = false) {
      this.options = option;
      this.context.evalJS("setOption(".concat(UTS.JSON.stringify([option, notMerge, lazyUpdate]), ")"));
    }
    setOption(option, notMerge) {
      this.options = option;
      this.context.evalJS("setOption(".concat(UTS.JSON.stringify([option, notMerge]), ")"));
    }
    getOption() {
      return this.options;
    }
    showLoading() {
      this.context.evalJS("showLoading(".concat(UTS.JSON.stringify([]), ")"));
    }
    showLoading(type, opts) {
      this.context.evalJS("showLoading(".concat(UTS.JSON.stringify([type, opts]), ")"));
    }
    hideLoading() {
      this.context.evalJS("hideLoading()");
    }
    clear() {
      this.context.evalJS("clear()");
    }
    dispose() {
      this.context.evalJS("dispose()");
    }
    resize(size) {
      setTimeout(() => {
        this.context.evalJS("resize(".concat(UTS.JSON.stringify(size), ")"));
      }, 0);
    }
    resize() {
      setTimeout(() => {
        this.context.evalJS("resize()");
      }, 10);
    }
    on(type, query = null, callback) {
      const key = "".concat(type).concat(UTS.JSON.stringify(query));
      if (typeof callback == "function") {
        this.eventMap.set(key, callback);
      }
      this.context.evalJS("on(".concat(UTS.JSON.stringify([type, query]), ")"));
      uni.__log__("warn", "at uni_modules/lime-echart/components/l-echart/uvue.uts:94", "uvue 暂不支持事件");
    }
    on(type, callback) {
      const key = "".concat(type);
      if (typeof callback == "function") {
        this.eventMap.set(key, callback);
      }
      this.context.evalJS("on(".concat(UTS.JSON.stringify([type]), ")"));
      uni.__log__("warn", "at uni_modules/lime-echart/components/l-echart/uvue.uts:102", "uvue 暂不支持事件");
    }
    dispatchAction(type, options) {
      const handler = UTS.mapGet(this.eventMap, type);
      if (handler != null) {
        handler(options);
      }
    }
    canvasToTempFilePath(opt) {
      this.context.evalJS("canvasToTempFilePath(".concat(UTS.JSON.stringify(opt), ")"));
      this.temp.push(opt);
    }
    isDisposed() {
      return false;
    }
  }
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
    __name: "l-echart",
    props: {
      webviewStyles: { type: null },
      lStyle: { type: null },
      isDisableScroll: { type: Boolean, default: false },
      isClickable: { type: Boolean, default: true },
      enableHover: { type: Boolean, default: false },
      beforeDelay: { default: 30, type: Number },
      landscape: { type: Boolean, default: false },
      autoHideTooltip: { type: Boolean, default: false }
    },
    emits: ["finished"],
    setup(__props, _a) {
      var __expose = _a.expose, __emit = _a.emit;
      const emits = __emit;
      const instance = vue.getCurrentInstance();
      "lime-echart-".concat(instance.uid);
      const finished = vue.ref(false);
      const initializationQueue = [];
      const callbackQueue = [];
      let chartInstance = null;
      let chartRef = vue.ref(null);
      const processInitializationQueue = () => {
        if (finished.value) {
          if (chartInstance == null) {
            chartInstance = new Echarts(chartRef.value);
          }
          while (initializationQueue.length > 0) {
            const resolve = UTS.arrayPop(initializationQueue);
            resolve(chartInstance);
          }
        }
        if (chartInstance != null) {
          while (callbackQueue.length > 0) {
            const callback = UTS.arrayPop(callbackQueue);
            callback(chartInstance);
          }
        }
      };
      const loaded = (event) => {
        event.stopPropagation();
        event.preventDefault();
        vue.nextTick(() => {
          var _a2, _b;
          (_b = (_a2 = chartRef.value) === null || _a2 === void 0 ? null : _a2.getBoundingClientRectAsync()) === null || _b === void 0 ? null : _b.then((res) => {
            if (res.width > 0 && res.height > 0) {
              finished.value = true;
              processInitializationQueue();
              emits("finished");
            } else {
              uni.__log__("warn", "at uni_modules/lime-echart/components/l-echart/l-echart.uvue:89", "【lime-echart】获取尺寸失败，请检查代码样式");
            }
          });
        });
      };
      const checkInitialization = () => {
        if (chartInstance == null) {
          uni.__log__("warn", "at uni_modules/lime-echart/components/l-echart/l-echart.uvue:99", "组件还未初始化，请先使用 init");
          return true;
        }
        return false;
      };
      const setOption = (option) => {
        if (checkInitialization())
          return null;
        chartInstance.setOption(option);
      };
      const showLoading = () => {
        if (checkInitialization())
          return null;
        chartInstance.showLoading();
      };
      const hideLoading = () => {
        if (checkInitialization())
          return null;
        chartInstance.hideLoading();
      };
      const clear = () => {
        if (checkInitialization())
          return null;
        chartInstance.clear();
      };
      const dispose = () => {
        if (checkInitialization())
          return null;
        chartInstance.dispose();
      };
      const resize = (size) => {
        if (checkInitialization())
          return null;
        chartInstance.resize(size);
      };
      const canvasToTempFilePath = (opt) => {
        if (checkInitialization())
          return null;
        chartInstance.canvasToTempFilePath(opt);
      };
      function init(callback = null) {
        if (callback != null) {
          callbackQueue.push(callback);
        }
        return new Promise((resolve) => {
          initializationQueue.push(resolve);
          processInitializationQueue();
        });
      }
      __expose({
        init,
        setOption,
        showLoading,
        hideLoading,
        clear,
        dispose,
        resize,
        canvasToTempFilePath
      });
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("web-view", new UTSJSONObject({
          class: "lime-echart",
          ref_key: "chartRef",
          ref: chartRef,
          onLoad: loaded,
          style: vue.normalizeStyle([_ctx.lStyle]),
          "webview-styles": [_ctx.webviewStyles],
          src: "/uni_modules/lime-echart/static/app/uvue.html?v=10112"
        }), null, 44, ["webview-styles"]);
      };
    }
  });
  const _style_0$n = { "lime-echart": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "width": "100%" } } };
  const lEchart = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["styles", [_style_0$n]]]);
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
    __name: "chart-bar-line",
    props: {
      options: {
        type: Object,
        default: new UTSJSONObject({})
      }
    },
    setup(__props) {
      const props = __props;
      const chartRef = vue.ref(null);
      let chart = null;
      function init() {
        let chartOption = new UTSJSONObject({
          grid: new UTSJSONObject({
            left: "4%",
            right: "4%",
            top: 30,
            bottom: 30
          }),
          tooltip: new UTSJSONObject({
            show: true,
            trigger: "axis",
            className: "chart-tooltip",
            extraCssText: "",
            formatter(data) {
              const unitValStr = ['<div class="p">'.concat(data[0].name, "</div>")];
              data.forEach((v, i) => {
                unitValStr.push('<div class="p">'.concat(v.marker.replace(/<span/, '<span class="chart-tooltip-dot dot-' + i + '"')).concat(v.seriesName, " ").concat(v.value, "分钟</div>"));
              });
              return unitValStr.join("");
            }
          }),
          xAxis: new UTSJSONObject({
            data: props.options.xAxis,
            axisLabel: new UTSJSONObject({
              color: "#AEAEAE"
            }),
            axisLine: new UTSJSONObject({
              lineStyle: new UTSJSONObject({
                color: "#C6C6C6",
                opacity: 0.7
              })
            }),
            axisTick: new UTSJSONObject({
              show: false
            })
          }),
          yAxis: new UTSJSONObject({
            axisTick: new UTSJSONObject({ show: false }),
            splitNumber: 2,
            axisLabel: new UTSJSONObject({
              color: "#AEAEAE"
              // formatter:"{value}m"
            }),
            splitLine: new UTSJSONObject({
              show: true,
              lineStyle: new UTSJSONObject({
                color: "#E9E9E9",
                type: [5, 10]
              })
            })
          }),
          series: [
            new UTSJSONObject({
              name: "网校均值",
              data: props.options.stackData2,
              type: "line",
              smooth: true,
              symbol: "none",
              itemStyle: new UTSJSONObject({
                borderRadius: [2, 2, 0, 0],
                color: new UTSJSONObject({
                  global: false,
                  type: "linear",
                  x: 0,
                  x2: 0,
                  y: 0,
                  y2: 1,
                  colorStops: [
                    new UTSJSONObject({ offset: 0, color: "#3F6EFF" }),
                    new UTSJSONObject({ offset: 1, color: "#49DDBD" })
                  ]
                })
              }),
              lineStyle: new UTSJSONObject({
                shadowColor: "rgba(63, 110, 255,0.3)",
                shadowBlur: 2,
                shadowOffsetY: 8
              })
            }),
            new UTSJSONObject({
              name: "学习时长",
              data: props.options.stackData1,
              type: "bar",
              barWidth: props.options.stackData1.length > 20 ? 15 : 30,
              itemStyle: new UTSJSONObject({
                borderRadius: [2, 2, 0, 0],
                color: new UTSJSONObject({
                  global: false,
                  type: "linear",
                  x: 0,
                  x2: 0,
                  y: 0,
                  y2: 1,
                  colorStops: [
                    new UTSJSONObject({ offset: 0, color: "#A684FF" }),
                    new UTSJSONObject({ offset: 1, color: "#6474FF" })
                  ]
                })
              })
            })
          ]
        });
        chart === null || chart === void 0 ? null : chart.setOption(chartOption);
      }
      const stop = vue.watch(props.options, () => {
        if (chart == null)
          return null;
        init();
      }, { deep: true });
      const initChart = () => {
        return __awaiter(this, void 0, void 0, function* () {
          if (chartRef.value === null)
            return Promise.resolve(null);
          chart = yield chartRef.value.init(null);
          init();
        });
      };
      vue.onBeforeUnmount(stop);
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "chart" }), [
          vue.createVNode(vue.unref(lEchart), new UTSJSONObject({
            ref_key: "chartRef",
            ref: chartRef,
            onFinished: initChart
          }), null, 512)
        ]);
      };
    }
  });
  const _style_0$m = { "chart": { "": { "height": "100%" } } };
  const chartBarLine = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["styles", [_style_0$m]]]);
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
    __name: "chart-radar",
    props: {
      options: {
        type: Object,
        default: new UTSJSONObject({})
      }
    },
    setup(__props) {
      const props = __props;
      const chartRef = vue.ref(null);
      let chart = null;
      function init() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let info = props.options;
        let option = new UTSJSONObject({
          radar: [
            new UTSJSONObject({
              indicator: [
                new UTSJSONObject({ text: "{a|".concat(info.completeStudyPathCount, "}\n完成任务数 (个)"), val: (_a = info.completeStudyPathCount) !== null && _a !== void 0 ? _a : 0 }),
                new UTSJSONObject({ text: "{a|".concat(info.completeTextStudyPathCount, "}\n讲义学习数 (个)"), val: (_b = info.completeTextStudyPathCount) !== null && _b !== void 0 ? _b : 0 }),
                new UTSJSONObject({ text: "{a|".concat(info.assistantConversationCount, "}\n智能教辅对话 (次)"), val: (_c = info.assistantConversationCount) !== null && _c !== void 0 ? _c : 0, max: 40 }),
                new UTSJSONObject({ text: "{a|".concat(info.questionAnswerCount, "}\n答疑数量 (条)"), val: (_d = info.questionAnswerCount) !== null && _d !== void 0 ? _d : 0, max: 40 }),
                new UTSJSONObject({ text: "{a|".concat(info.completeQuestionCount, "}\n答题数量 (题)"), val: (_e = info.completeQuestionCount) !== null && _e !== void 0 ? _e : 0 })
              ],
              center: ["50%", "50%"],
              radius: "60%",
              startAngle: 90,
              splitNumber: 4,
              shape: "circle",
              nameGap: 8,
              axisName: new UTSJSONObject({
                color: "#AEAEAE",
                fontSize: 9,
                rich: new UTSJSONObject({
                  a: new UTSJSONObject({
                    fontSize: 10,
                    lineHeight: 14,
                    color: "#001932",
                    align: "center"
                  }),
                  b: new UTSJSONObject({
                    fontSize: 8,
                    lineHeight: 14,
                    color: "#AEAEAE",
                    align: "center"
                  })
                })
              }),
              splitArea: new UTSJSONObject({
                areaStyle: new UTSJSONObject({
                  color: "none"
                })
              }),
              axisLine: new UTSJSONObject({
                lineStyle: new UTSJSONObject({
                  color: "#C3C3FC"
                })
              }),
              splitLine: new UTSJSONObject({
                lineStyle: new UTSJSONObject({
                  width: 1,
                  color: ["rgba(174, 174, 252,1)", "rgba(174, 174, 252,0.6)", "rgba(174, 174, 252,0.6)", "rgba(174, 174, 252,0.6)"]
                  //type: 'dashed',
                })
              })
            })
          ],
          series: [
            new UTSJSONObject({
              type: "radar",
              emphasis: new UTSJSONObject({
                lineStyle: new UTSJSONObject({
                  width: 2
                })
              }),
              data: [
                new UTSJSONObject({
                  value: [
                    (_f = info.completeStudyPathCount) !== null && _f !== void 0 ? _f : 0,
                    (_g = info.completeTextStudyPathCount) !== null && _g !== void 0 ? _g : 0,
                    (_h = info.assistantConversationCount2) !== null && _h !== void 0 ? _h : 0,
                    (_j = info.questionAnswerCount2) !== null && _j !== void 0 ? _j : 0,
                    (_k = info.completeQuestionCount) !== null && _k !== void 0 ? _k : 0
                  ]
                })
              ],
              lineStyle: new UTSJSONObject({
                width: 0
              }),
              symbolSize: 0,
              areaStyle: new UTSJSONObject({
                color: new UTSJSONObject({
                  global: false,
                  type: "radial",
                  r: 1,
                  x: 1,
                  y: 0.5,
                  colorStops: [
                    new UTSJSONObject({ offset: 0, color: "#A684FF" }),
                    new UTSJSONObject({ offset: 1, color: "#6474FF" })
                  ]
                }),
                opacity: 1
              })
            })
          ]
        });
        chart === null || chart === void 0 ? null : chart.setOption(option);
      }
      const stop = vue.watch(props.options, () => {
        if (chart == null)
          return null;
        init();
      }, { deep: true });
      const initChart = () => {
        return __awaiter(this, void 0, void 0, function* () {
          if (chartRef.value === null)
            return Promise.resolve(null);
          chart = yield chartRef.value.init(null);
          init();
        });
      };
      vue.onBeforeUnmount(stop);
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "chart" }), [
          vue.createVNode(vue.unref(lEchart), new UTSJSONObject({
            ref_key: "chartRef",
            ref: chartRef,
            onFinished: initChart
          }), null, 512)
        ]);
      };
    }
  });
  const _style_0$l = { "chart": { "": { "height": "100%" } } };
  const chartRadar = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["styles", [_style_0$l]]]);
  const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
    __name: "chart-circle",
    props: {
      options: {
        type: Object,
        default: new UTSJSONObject({})
      }
    },
    setup(__props) {
      const props = __props;
      const chartRef = vue.ref(null);
      let chart = null;
      function init() {
        let percent = props.options.percent;
        let option = new UTSJSONObject({
          color: [props.options.color, "#F8F7FF"],
          title: new UTSJSONObject({
            text: "".concat(percent.toFixed(1), "{a|%}"),
            x: "center",
            y: "center",
            textStyle: new UTSJSONObject({
              color: "#262626",
              fontSize: 12,
              rich: new UTSJSONObject({
                a: new UTSJSONObject({
                  fontSize: 9
                })
              })
            })
          }),
          series: [
            new UTSJSONObject({
              name: "",
              type: "pie",
              radius: ["80%", "98%"],
              avoidLabelOverlap: false,
              label: new UTSJSONObject({
                show: false,
                position: "center"
              }),
              emphasis: new UTSJSONObject({
                disabled: true
              }),
              labelLine: new UTSJSONObject({
                show: false
              }),
              data: [
                new UTSJSONObject({ value: percent, name: "1" }),
                new UTSJSONObject({ value: 100 - percent, name: "2" })
              ]
            })
          ]
        });
        chart === null || chart === void 0 ? null : chart.setOption(option);
      }
      const stop = vue.watch(props.options, () => {
        if (chart == null)
          return null;
        init();
      }, { deep: true });
      const initChart = () => {
        return __awaiter(this, void 0, void 0, function* () {
          if (chartRef.value === null)
            return Promise.resolve(null);
          chart = yield chartRef.value.init(null);
          init();
        });
      };
      vue.onBeforeUnmount(stop);
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "chart" }), [
          vue.createVNode(vue.unref(lEchart), new UTSJSONObject({
            ref_key: "chartRef",
            ref: chartRef,
            onFinished: initChart
          }), null, 512)
        ]);
      };
    }
  });
  const _style_0$k = { "chart": { "": { "height": "100%" } } };
  const chartCircle = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["styles", [_style_0$k]]]);
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
    __name: "chart-pie",
    props: {
      options: {
        type: Object,
        default: new UTSJSONObject({})
      }
    },
    setup(__props) {
      const props = __props;
      const chartRef = vue.ref(null);
      let chart = null;
      function init() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        let option = new UTSJSONObject({
          color: ["#22D499", "#FFB760", "#FF6447"],
          series: [
            new UTSJSONObject({
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              selectedMode: "single",
              label: new UTSJSONObject({
                show: true,
                fontSize: 12,
                color: "#171921",
                lineHeight: 16,
                bleedMargin: 0,
                distanceToLabelLine: 5,
                // formatter: (params:any) => {
                // 	// uni.__log__('log','at pages/study-report/modules/chart-pie.uvue:38',1111,222)
                // 	return '111'
                // 	// return '{circle|}{blank|}' + `${ params.data.name }${ params.data.total }个\n{blank2|}{a|占比${ params.percent }%}`
                // },
                rich: new UTSJSONObject({
                  circle: new UTSJSONObject({
                    // 设置小圆点的样式
                    width: 6,
                    height: 6,
                    align: "left",
                    verticalAlign: "middle",
                    backgroundColor: "inherit",
                    borderRadius: 3
                  }),
                  blank: new UTSJSONObject({
                    width: 5
                  }),
                  blank2: new UTSJSONObject({
                    width: 11,
                    align: "left"
                  }),
                  a: new UTSJSONObject({
                    align: "left"
                  })
                })
              }),
              labelLine: new UTSJSONObject({
                show: false,
                length: 8,
                length2: 8
              }),
              data: [
                new UTSJSONObject({
                  name: "{circle|}{blank|}已掌握".concat((_b = (_a = props.options) === null || _a === void 0 ? null : _a.masteryKnowledgeCount) !== null && _b !== void 0 ? _b : 0, "个\n{blank2|}占比").concat((_d = (_c = props.options) === null || _c === void 0 ? null : _c.masteryKnowledgeRate) !== null && _d !== void 0 ? _d : 0, "%"),
                  value: (_f = (_e = props.options) === null || _e === void 0 ? null : _e.masteryKnowledgeRate) !== null && _f !== void 0 ? _f : 0,
                  total: (_h = (_g = props.options) === null || _g === void 0 ? null : _g.masteryKnowledgeCount) !== null && _h !== void 0 ? _h : 0
                }),
                new UTSJSONObject({
                  name: "{circle|}{blank|}待加强".concat((_k = (_j = props.options) === null || _j === void 0 ? null : _j.improvingKnowledgeCount) !== null && _k !== void 0 ? _k : 0, "个\n{blank2|}占比").concat((_m = (_l = props.options) === null || _l === void 0 ? null : _l.improvingKnowledgeRate) !== null && _m !== void 0 ? _m : 0, "%"),
                  value: (_p = (_o = props.options) === null || _o === void 0 ? null : _o.improvingKnowledgeRate) !== null && _p !== void 0 ? _p : 0,
                  total: (_r = (_q = props.options) === null || _q === void 0 ? null : _q.improvingKnowledgeCount) !== null && _r !== void 0 ? _r : 0
                }),
                new UTSJSONObject({
                  name: "{circle|}{blank|}未掌握".concat((_t = (_s = props.options) === null || _s === void 0 ? null : _s.notMasteredKnowledgeCount) !== null && _t !== void 0 ? _t : 0, "个\n{blank2|}占比").concat((_v = (_u = props.options) === null || _u === void 0 ? null : _u.notMasteredKnowledgeRate) !== null && _v !== void 0 ? _v : 0, "%"),
                  value: (_x = (_w = props.options) === null || _w === void 0 ? null : _w.notMasteredKnowledgeRate) !== null && _x !== void 0 ? _x : 0,
                  total: (_z = (_y = props.options) === null || _y === void 0 ? null : _y.notMasteredKnowledgeCount) !== null && _z !== void 0 ? _z : 0
                })
              ],
              itemStyle: new UTSJSONObject({
                // 设置扇区之间的间隔
                borderWidth: 1,
                borderColor: "#fff"
                // 设置边界颜色为白色
              }),
              emphasis: new UTSJSONObject({
                itemStyle: new UTSJSONObject({
                  borderWidth: 0,
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                })
              })
            })
          ]
        });
        chart === null || chart === void 0 ? null : chart.setOption(option);
      }
      const stop = vue.watch(props.options, () => {
        if (chart == null)
          return null;
        init();
      }, { deep: true });
      const initChart = () => {
        return __awaiter(this, void 0, void 0, function* () {
          if (chartRef.value === null)
            return Promise.resolve(null);
          chart = yield chartRef.value.init(null);
          init();
        });
      };
      vue.onBeforeUnmount(stop);
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "chart" }), [
          vue.createVNode(vue.unref(lEchart), new UTSJSONObject({
            ref_key: "chartRef",
            ref: chartRef,
            onFinished: initChart
          }), null, 512)
        ]);
      };
    }
  });
  const _style_0$j = { "chart": { "": { "height": "100%" } } };
  const chartPie = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["styles", [_style_0$j]]]);
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "total-report",
    setup(__props) {
      const initId = vue.inject("initId", vue.ref(0));
      const reportTime = timeFormat(Date.now(), "yyyy年mm月dd日 hh:MM");
      const statList = vue.reactive([
        new UTSJSONObject({ label: "学习时长(分钟)", val: "--" }),
        new UTSJSONObject({ label: "做题数量(道)", val: "--" }),
        new UTSJSONObject({ label: "完课率", val: "--", type: 1 }),
        new UTSJSONObject({ label: "已学知识点(个)", val: "--" }),
        new UTSJSONObject({ label: "知识点掌握率", val: "--", type: 1 })
      ]);
      const studyProgress = vue.ref(0);
      const timeFilterList = [
        new UTSJSONObject({ label: "日", val: 0, key: "dateStr", unit: "day" }),
        new UTSJSONObject({ label: "周", val: 1, key: "weekStr", unit: "week" }),
        new UTSJSONObject({ label: "月", val: 2, key: "monthStr", unit: "month" })
      ];
      const timeFilterIndex = vue.ref(0);
      const sumStudyLength = vue.reactive(new UTSJSONObject({
        h: 0,
        m: 0
      }));
      const chartBarOptions = vue.reactive(new UTSJSONObject({
        xAxis: [],
        stackData1: [],
        stackData2: []
      }));
      const studyMethodOverviewVoList = vue.ref([]);
      const suggestHtml = vue.ref("");
      const userSelectStudyTargetName = vue.ref("");
      const radarInfo = vue.reactive(new UTSJSONObject({
        assistantConversationCount: 0,
        completeQuestionCount: 0,
        completeStudyPathCount: 0,
        completeTextStudyPathCount: 0,
        questionAnswerCount: 0,
        totalQuestionCount: 0,
        totalStudyPathCount: 0,
        totalTextStudyPathCount: 0,
        assistantConversationCount2: 0,
        questionAnswerCount2: 0
      }));
      const stageList = vue.reactive([
        new UTSJSONObject({ color: "#FFB467", percent: 0, stageName: "--", val1: "--", val2: "--" }),
        new UTSJSONObject({ color: "#A172EB", percent: 0, stageName: "--", val1: "--", val2: "--" }),
        new UTSJSONObject({ color: "#525EFB", percent: 0, stageName: "--", val1: "--", val2: "--" })
      ]);
      const knowledgeProgressReport = vue.reactive(new UTSJSONObject({
        improvingKnowledgeCount: 0,
        improvingKnowledgeRate: 0,
        masteryKnowledgeCount: 0,
        masteryKnowledgeRate: 0,
        notMasteredKnowledgeCount: 0,
        notMasteredKnowledgeRate: 0,
        totalKnowledgeCount: 0
      }));
      const passRate = vue.ref(0);
      const getUserProductSumReportInfo = () => {
        let data = new UTSJSONObject({
          productId: state$1.activeCategory.productId,
          categoryId: state$1.activeCategory.categoryId,
          goodsId: state$1.goodsId
        });
        http.get("/japi/al/v7/studyReport/getUserProductSumReportInfo", data).then((res = null) => {
          var _a, _b, _c, _d, _e, _f, _g;
          let info = respDataAsObject(res);
          let totalSumLength = (_a = info.totalSumLength) !== null && _a !== void 0 ? _a : 0;
          sumStudyLength.h = Math.floor(totalSumLength / 60);
          sumStudyLength.m = totalSumLength % 60;
          studyProgress.value = (_b = info.studyProgress) !== null && _b !== void 0 ? _b : 0;
          statList[0].val = (_c = info.totalSumLength) !== null && _c !== void 0 ? _c : 0;
          statList[1].val = (_d = info.totalAnswerSum) !== null && _d !== void 0 ? _d : 0;
          statList[2].val = (_e = info.wholeCompleteRate) !== null && _e !== void 0 ? _e : 0;
          statList[3].val = (_f = info.studyKnowledgeNum) !== null && _f !== void 0 ? _f : 0;
          statList[4].val = (_g = info.knowledgeMasteryRate) !== null && _g !== void 0 ? _g : 0;
        });
      };
      function getUsetimeReportOfGoods() {
        let filterItem = timeFilterList[timeFilterIndex.value];
        let data = new UTSJSONObject({
          categoryId: state$1.activeCategory.categoryId,
          goodsId: state$1.goodsId,
          type: filterItem.val,
          curDateTime: Date.now()
        });
        http.get("/japi/al/v6/studyReport/getUsetimeReportOfGoods", data).then((res = null) => {
          var _a;
          let xAxis = [], stackData1 = [], stackData2 = [];
          let info = respDataAsObject(res);
          let list = (_a = info.webUsetimeCountDTOList) !== null && _a !== void 0 ? _a : new Array();
          let today = timeFormat(Date.now(), "YYYY-MM-DD");
          list.forEach((item) => {
            if (item.dateStrFormatYmd == today) {
              item.dateStr = "今天";
            }
            xAxis.push(item[filterItem.key]);
            stackData1.push(item.allUsetime);
            stackData2.push(item.schoolAvg);
          });
          chartBarOptions.xAxis = xAxis;
          chartBarOptions.stackData1 = stackData1;
          chartBarOptions.stackData2 = stackData2;
        });
      }
      function getLearningRadarReport() {
        let data = new UTSJSONObject({
          goodsId: state$1.goodsId,
          categoryId: state$1.activeCategory.categoryId,
          productId: state$1.activeCategory.productId
        });
        http.get("/japi/al/v7/studyReport/getLearningRadarReport", data).then((res = null) => {
          var _a;
          let info = respDataAsObject(res);
          info.assistantConversationCount2 = info.assistantConversationCount > 40 ? 40 : info.assistantConversationCount;
          info.questionAnswerCount2 = info.questionAnswerCount > 40 ? 40 : info.questionAnswerCount;
          for (let k in info) {
            radarInfo[k] = (_a = info[k]) !== null && _a !== void 0 ? _a : 0;
          }
        });
      }
      const getUserCourseOverview = () => {
        var _a;
        let data = new UTSJSONObject({
          secondCategoryId: state$1.activeCategory.secondCategoryId,
          productId: (_a = state$1.activeCategory) === null || _a === void 0 ? null : _a.productId,
          categoryId: state$1.activeCategory.categoryId
        });
        http.get("/japi/al/v7/studyReport/getUserCourseOverview", data).then((res = null) => {
          var _a2, _b, _c;
          let info = respDataAsObject(res);
          let stageOverviewVOList = (_a2 = info.stageOverviewVOList) !== null && _a2 !== void 0 ? _a2 : new Array();
          stageOverviewVOList.forEach((item, index) => {
            var _a3, _b2;
            stageList[index].stageName = item.stageName;
            stageList[index].percent = item.stageCompleteRate * 100;
            stageList[index].val1 = (_a3 = item.completeStudyPathNum) !== null && _a3 !== void 0 ? _a3 : 0;
            stageList[index].val2 = (_b2 = item.totalStudyPathNum) !== null && _b2 !== void 0 ? _b2 : 0;
          });
          studyMethodOverviewVoList.value = (_b = info.studyMethodOverviewVoList) !== null && _b !== void 0 ? _b : new Array();
          userSelectStudyTargetName.value = (_c = info.userSelectStudyTargetName) !== null && _c !== void 0 ? _c : "";
        });
      };
      function getDaily() {
        let data = new UTSJSONObject({
          goodsId: state$1.goodsId,
          productId: state$1.activeCategory.productId,
          categoryId: state$1.activeCategory.categoryId
        });
        http.get("/japi/al/v3/studyReport/daily", data).then((res = null) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j;
          let info = respDataAsObject(res);
          let k = (_a = info.knowledgeProgressReport) !== null && _a !== void 0 ? _a : new UTSJSONObject({});
          knowledgeProgressReport.improvingKnowledgeCount = (_b = k.improvingKnowledgeCount) !== null && _b !== void 0 ? _b : 0;
          knowledgeProgressReport.improvingKnowledgeRate = (_c = k.improvingKnowledgeRate) !== null && _c !== void 0 ? _c : 0;
          knowledgeProgressReport.masteryKnowledgeCount = (_d = k.masteryKnowledgeCount) !== null && _d !== void 0 ? _d : 0;
          knowledgeProgressReport.masteryKnowledgeRate = (_e = k.masteryKnowledgeRate) !== null && _e !== void 0 ? _e : 0;
          knowledgeProgressReport.notMasteredKnowledgeCount = (_f = k.notMasteredKnowledgeCount) !== null && _f !== void 0 ? _f : 0;
          knowledgeProgressReport.notMasteredKnowledgeRate = (_g = k.notMasteredKnowledgeRate) !== null && _g !== void 0 ? _g : 0;
          knowledgeProgressReport.totalKnowledgeCount = (_h = k.totalKnowledgeCount) !== null && _h !== void 0 ? _h : 0;
          let p = (_j = info.passRate) !== null && _j !== void 0 ? _j : new UTSJSONObject({ passRate: 0 });
          passRate.value = p.passRate * 100;
        });
      }
      function getStudySuggestionStream() {
        let data = new UTSJSONObject({
          productId: state$1.activeCategory.productId,
          goodsId: state$1.goodsId
        });
        let httpTaskKey = "/ai/al/assistant/getStudySuggestionStream-".concat(Date.now());
        http.post("/ai/al/assistant/getStudySuggestionStream", data, new UTSJSONObject({
          enableChunked: true,
          httpTaskKey
        }));
        let requestTask = UTS.mapGet(http.requestTaskMap, httpTaskKey);
        if (requestTask != null) {
          streamDecoder(requestTask, (res) => {
            var _a, _b;
            if (res.event == "content") {
              if (((_a = res.data) === null || _a === void 0 ? null : _a.type) == "text") {
                suggestHtml.value += (_b = res.data) === null || _b === void 0 ? null : _b.data;
              }
            }
          });
        }
      }
      const switchTimeFilter = (index) => {
        if (timeFilterIndex.value == index)
          return null;
        timeFilterIndex.value = index;
        getUsetimeReportOfGoods();
      };
      const commonOptions = () => {
        return new UTSJSONObject({
          categoryId: state$1.activeCategory.categoryId,
          productId: state$1.activeCategory.productId,
          goodsId: state$1.goodsId
        });
      };
      const handlerKnowledgePointMasterDetail = () => {
        router.app(new RouterOptions({
          url: "app://cspro/knowledgePointMasterDetail",
          query: new UTSJSONObject(Object.assign({}, commonOptions()))
        }));
      };
      const handlerClassDetail = (item) => {
        router.app(new RouterOptions({
          url: "app://cspro/classDetail",
          query: new UTSJSONObject(Object.assign(Object.assign({}, commonOptions()), { studyMethodId: item.studyMethodId, studyMethodName: item.studyMethodName }))
        }));
      };
      const handlerCoursePreviewDetail = (item) => {
        router.app(new RouterOptions({
          url: "app://cspro/knowledgePointMasterDetail",
          query: new UTSJSONObject(Object.assign(Object.assign({}, commonOptions()), { stageId: item.stageId, stageName: item.stageName }))
        }));
      };
      const stop = vue.watch(initId, () => {
        if (state$1.activeCategory.categoryId != null) {
          getUserProductSumReportInfo();
          getUserCourseOverview();
          getUsetimeReportOfGoods();
          getLearningRadarReport();
          getDaily();
          if (suggestHtml.value == "") {
            getStudySuggestionStream();
          }
        }
      }, { immediate: true });
      vue.onBeforeUnmount(() => {
        stop();
      });
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "total-report" }), [
          vue.createElementVNode("view", new UTSJSONObject({ class: "section base-section" }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "stat-box" }), [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(statList), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                  class: "item",
                  key: index
                }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "value" }), [
                    vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), vue.toDisplayString(item.val), 1),
                    item.type == 1 && item.val != "--" ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                      key: 0,
                      class: "i"
                    }), "%")) : vue.createCommentVNode("", true)
                  ]),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "label" }), [
                    vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), vue.toDisplayString(item.label), 1)
                  ])
                ]);
              }), 128))
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "study-status-box" }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "value" }), [
                vue.createElementVNode("image", new UTSJSONObject({
                  class: "image",
                  src: "static/images/grade-status-0".concat(vue.unref(studyProgress), ".png")
                }), null, 8, ["src"])
              ]),
              vue.createElementVNode("text", new UTSJSONObject({ class: "label" }), "你当前的学习进度")
            ])
          ]),
          vue.renderSlot(_ctx.$slots, "default"),
          vue.createElementVNode("view", new UTSJSONObject({ class: "section study-section" }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "section-title" }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "学习进度")
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "sub-title" }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "text" }), [
                vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "累计学习时长"),
                vue.unref(sumStudyLength).h != 0 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, new UTSJSONObject({ key: 0 }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "n" }), vue.toDisplayString(vue.unref(sumStudyLength).h), 1),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "小时")
                ], 64)) : vue.createCommentVNode("", true),
                vue.unref(sumStudyLength).h == 0 || vue.unref(sumStudyLength).m != 0 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, new UTSJSONObject({ key: 1 }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "n" }), vue.toDisplayString(vue.unref(sumStudyLength).m), 1),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "分钟")
                ], 64)) : vue.createCommentVNode("", true)
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "filter-list" }), [
                (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(timeFilterList, (item, index) => {
                  return vue.createElementVNode("text", new UTSJSONObject({
                    class: vue.normalizeClass(["item", new UTSJSONObject({ active: index == vue.unref(timeFilterIndex) })]),
                    key: index,
                    onClick: ($event = null) => {
                      return switchTimeFilter(index);
                    }
                  }), vue.toDisplayString(item.label), 11, ["onClick"]);
                }), 64))
              ])
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "chart-box" }), [
              vue.createVNode(vue.unref(chartBarLine), new UTSJSONObject({ options: vue.unref(chartBarOptions) }), null, 8, ["options"])
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "graphic" }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "item item-01" }), [
                vue.createElementVNode("image", new UTSJSONObject({
                  class: "dot",
                  src: _imports_1$8
                })),
                vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "网校均值")
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "item item-02" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "dot" })),
                vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "学习时长")
              ])
            ])
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "section main-section" }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "wrap" }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "box box-01" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "title" }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "学情雷达")
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "chart-box" }), [
                  vue.createVNode(vue.unref(chartRadar), new UTSJSONObject({ options: vue.unref(radarInfo) }), null, 8, ["options"])
                ])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "box box-02" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "title" }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "课程全览")
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "stage-list" }), [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(stageList), (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                      class: "stage-item",
                      key: index,
                      onClick: ($event = null) => {
                        return handlerCoursePreviewDetail(item);
                      }
                    }), [
                      vue.createElementVNode("view", new UTSJSONObject({ class: "chart" }), [
                        vue.createVNode(vue.unref(chartCircle), new UTSJSONObject({ options: item }), null, 8, ["options"])
                      ]),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "p1" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "n" }), vue.toDisplayString(item.val1), 1),
                        vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "/" + vue.toDisplayString(item.val2), 1)
                      ]),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "p2" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString(item.stageName), 1)
                      ]),
                      vue.unref(userSelectStudyTargetName) != "" && index == 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                        key: 0,
                        class: "p3"
                      }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "(" + vue.toDisplayString(vue.unref(userSelectStudyTargetName)) + ")", 1)
                      ])) : vue.createCommentVNode("", true)
                    ], 8, ["onClick"]);
                  }), 128))
                ])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "box box-03" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "title" }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "知识掌握"),
                  vue.createElementVNode("text", new UTSJSONObject({
                    class: "desc",
                    onClick: handlerKnowledgePointMasterDetail
                  }), "详情 >")
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "chart-box" }), [
                  vue.createVNode(vue.unref(chartPie), new UTSJSONObject({ options: vue.unref(knowledgeProgressReport) }), null, 8, ["options"])
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "tips" }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "根据你当前的知识点掌握情况，预测考试通过率为"),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t n" }), vue.toDisplayString(vue.unref(passRate)) + "%", 1),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "tag" }), [
                    vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "仅供参考")
                  ])
                ])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "box box-04" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "title" }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "班次进度")
                ]),
                vue.createElementVNode("scroll-view", new UTSJSONObject({ style: new UTSJSONObject({ "flex": "1" }) }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "list" }), [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(studyMethodOverviewVoList), (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                        class: "item",
                        key: index,
                        onClick: ($event = null) => {
                          return handlerClassDetail(item);
                        }
                      }), [
                        vue.createElementVNode("view", new UTSJSONObject({ class: "value" }), [
                          vue.createElementVNode("text", new UTSJSONObject({ class: "c" }), vue.toDisplayString(item.completeStudyPathNum), 1),
                          vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "/" + vue.toDisplayString(item.totalStudyPathNum), 1)
                        ]),
                        vue.createElementVNode("text", new UTSJSONObject({ class: "label" }), vue.toDisplayString(item.studyMethodName), 1)
                      ], 8, ["onClick"]);
                    }), 128))
                  ])
                ])
              ])
            ]),
            vue.createVNode(vue.unref(rank), new UTSJSONObject({ class: "rank" }))
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "section" }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "section-title" }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "学习建议")
            ]),
            vue.createElementVNode("text", new UTSJSONObject({ class: "rich-text" }), vue.toDisplayString(vue.unref(suggestHtml)), 1)
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "section footer" }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "p" }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "报告生成时间：" + vue.toDisplayString(vue.unref(reportTime)), 1)
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "p" }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "以上部分内容由 AI 生成")
            ])
          ])
        ]);
      };
    }
  });
  const _style_0$i = { "section": { "": { "marginBottom": "28rpx", "marginBottom:last-child": 0 } }, "text": { ".section-title ": { "fontWeight": "700", "fontSize": "10rpx", "color": "#171921", "lineHeight": "15rpx" }, ".sub-title ": { "flexDirection": "row" }, ".stat-box .item .value ": { "fontWeight": "bold", "fontSize": "18rpx", "color": "#001932", "lineHeight": "20rpx", "whiteSpace": "nowrap" }, ".stat-box .item .label ": { "fontSize": "8rpx", "color": "#747491", "lineHeight": "10rpx" }, ".study-section .graphic .item ": { "fontSize": "8rpx", "color": "#9A9A9A", "lineHeight": "10rpx" }, ".footer ": { "fontSize": "7rpx", "color": "#747491", "lineHeight": "10rpx", "textAlign": "center" }, ".box .title ": { "fontWeight": "700", "fontSize": "10rpx", "color": "#171921", "lineHeight": "15rpx" }, ".box-03 .tag ": { "fontSize": "7rpx", "color": "#FFFFFF", "lineHeight": "10.42rpx" } }, "sub-title": { "": { "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "4rpx" } }, "t": { ".sub-title .text ": { "fontSize": "8rpx", "color": "#9A9A9A", "lineHeight": "11rpx" }, ".box-02 .p1 ": { "fontSize": "9rpx", "color": "#747491", "lineHeight": "13rpx" }, ".box-02 .p2 ": { "fontSize": "8rpx", "color": "#262626", "lineHeight": "11rpx" }, ".box-02 .p3 ": { "fontSize": "7rpx", "color": "#FF955B", "lineHeight": "10rpx" }, ".box-03 .tips ": { "fontWeight": "700", "fontSize": "7rpx", "color": "#171921", "lineHeight": "10rpx" }, ".box-04 .list .item .value ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#000000", "lineHeight": "13rpx" } }, "n": { ".sub-title .text ": { "fontSize": "8rpx", "color": "#525EFB", "lineHeight": "11rpx", "paddingLeft": "2rpx", "fontWeight": "700" }, ".box-02 .p1 ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#000000", "lineHeight": "13rpx" }, ".box-03 .tips ": { "color": "#525EFB" } }, "filter-list": { ".sub-title ": { "flexDirection": "row", "backgroundImage": "none", "backgroundColor": "rgba(82,94,251,0.08)", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "4rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": "4rpx", "paddingTop": "1rpx", "paddingRight": "1rpx", "paddingBottom": "1rpx", "paddingLeft": "1rpx" } }, "item": { ".sub-title .filter-list ": { "textAlign": "center", "width": "28rpx", "fontSize": "8rpx", "color": "#747491", "lineHeight": "17rpx", "borderTopLeftRadius": "2rpx", "borderTopRightRadius": "2rpx", "borderBottomRightRadius": "2rpx", "borderBottomLeftRadius": "2rpx" }, ".stat-box ": { "marginRight": "24rpx", "display": "flex", "alignItems": "center", "marginRight:last-child": 0 }, ".study-section .graphic ": { "flexDirection": "row", "alignItems": "center", "marginLeft": "12rpx" }, ".box-04 .list ": { "flexShrink": 0, "width": "48%", "marginRight": "2%", "borderTopLeftRadius": "5rpx", "borderTopRightRadius": "5rpx", "borderBottomRightRadius": "5rpx", "borderBottomLeftRadius": "5rpx", "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(151,150,175,0.12)", "borderRightColor": "rgba(151,150,175,0.12)", "borderBottomColor": "rgba(151,150,175,0.12)", "borderLeftColor": "rgba(151,150,175,0.12)", "paddingTop": "5rpx", "paddingRight": 0, "paddingBottom": "5rpx", "paddingLeft": 0, "marginBottom": "6rpx", "alignItems": "center" } }, "active": { ".sub-title .filter-list ": { "color": "#525EFB", "backgroundImage": "none", "backgroundColor": "#ffffff" } }, "base-section": { "": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" } }, "stat-box": { "": { "display": "flex", "flexDirection": "row" } }, "value": { ".stat-box .item ": { "marginBottom": "4rpx", "display": "flex", "flexDirection": "row", "alignItems": "flex-end" }, ".study-status-box ": { "width": "44rpx", "height": "22rpx", "marginBottom": "2rpx" }, ".box-04 .list .item ": { "marginBottom": "2rpx", "flexDirection": "row" } }, "i": { ".stat-box .item .value ": { "fontSize": "12rpx" } }, "study-status-box": { "": { "display": "flex", "alignItems": "center" } }, "image": { ".study-status-box .value ": { "width": "100%", "height": "100%" } }, "label": { ".study-status-box ": { "fontSize": "7rpx", "color": "#747491", "lineHeight": "14rpx" }, ".box-04 .list .item ": { "fontSize": "8rpx", "color": "#8B8FA1", "lineHeight": "10rpx" } }, "study-section": { "": { "paddingTop": "30rpx" } }, "chart-box": { ".study-section ": { "height": "140rpx" }, ".box-01 ": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" }, ".box-03 ": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } }, "graphic": { ".study-section ": { "flexDirection": "row", "justifyContent": "flex-end" } }, "dot": { ".study-section .graphic .item ": { "width": "6rpx", "height": "6rpx", "marginRight": "2rpx" }, ".study-section .graphic .item-02 ": { "backgroundImage": "linear-gradient(180deg, #819FFF, #3F6EFF)", "backgroundColor": "rgba(0,0,0,0)", "borderTopLeftRadius": "1rpx", "borderTopRightRadius": "1rpx", "borderBottomRightRadius": "1rpx", "borderBottomLeftRadius": "1rpx" } }, "main-section": { "": { "flexDirection": "row" } }, "wrap": { ".main-section ": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" }, "": { "flexDirection": "row", "flexWrap": "wrap" } }, "rank": { ".main-section ": { "width": "198rpx", "height": "377rpx", "flexShrink": 0 } }, "box": { ".wrap ": { "width": "50%", "height": "200rpx" } }, "rich-text": { "": { "paddingTop": "14rpx", "fontSize": "9rpx", "color": "#1B1B48", "lineHeight": "15rpx" } }, "p": { ".footer ": { "marginBottom": "4rpx" } }, "title": { ".box ": { "marginBottom": "12rpx", "display": "flex", "flexDirection": "row", "alignItems": "flex-end" } }, "desc": { ".box .title ": { "fontSize": "6rpx", "color": "#747491", "lineHeight": "9rpx", "marginLeft": "5.21rpx", "paddingBottom": "1.56rpx" } }, "stage-list": { ".box-02 ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-around" } }, "stage-item": { ".box-02 ": { "alignItems": "center", "paddingTop": "14rpx" } }, "chart": { ".box-02 ": { "height": "46rpx", "width": "46rpx", "marginBottom": "12.5rpx" } }, "p1": { ".box-02 ": { "marginBottom": "5.7rpx", "display": "flex", "flexDirection": "row" } }, "p2": { ".box-02 ": { "marginBottom": "4.17rpx" } }, "tips": { ".box-03 ": { "display": "flex", "flexDirection": "row", "paddingTop": "10rpx" } }, "tag": { ".box-03 ": { "height": "10.42rpx", "paddingTop": 0, "paddingRight": "2.08rpx", "paddingBottom": 0, "paddingLeft": "2.08rpx", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "1rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": "1rpx", "backgroundImage": "none", "backgroundColor": "#BEC6D1", "marginTop": "-5rpx" } }, "list": { ".box-04 ": { "flexDirection": "row", "flexWrap": "wrap", "paddingTop": 0, "paddingRight": "6rpx", "paddingBottom": 0, "paddingLeft": "6rpx" } }, "c": { ".box-04 .list .item .value ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#4F46E5", "lineHeight": "13rpx" } } };
  const totalReport = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["styles", [_style_0$i]]]);
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
    __name: "chart-bar",
    props: {
      options: {
        type: Object,
        default: new UTSJSONObject({})
      }
    },
    setup(__props) {
      const props = __props;
      const chartRef = vue.ref(null);
      let chart = null;
      function init() {
        let chartOption = new UTSJSONObject({
          grid: new UTSJSONObject({
            left: "4%",
            right: "4%",
            top: 30,
            bottom: 30
          }),
          tooltip: new UTSJSONObject({
            show: true,
            trigger: "axis",
            className: "chart-tooltip",
            extraCssText: "",
            formatter(data) {
              const unitValStr = ['<div class="p">'.concat(data[0].name, "</div>")];
              data.forEach((v, i) => {
                unitValStr.push('<div class="p">'.concat(v.marker.replace(/<span/, '<span class="chart-tooltip-dot dot-' + i + '"')).concat(v.seriesName, " ").concat(v.value, "分钟</div>"));
              });
              return unitValStr.join("");
            }
          }),
          xAxis: new UTSJSONObject({
            data: props.options.xAxis,
            axisLabel: new UTSJSONObject({
              color: "#AEAEAE"
            }),
            axisLine: new UTSJSONObject({
              lineStyle: new UTSJSONObject({
                color: "#C6C6C6",
                opacity: 0.7
              })
            }),
            axisTick: new UTSJSONObject({
              show: false
            })
          }),
          yAxis: new UTSJSONObject({
            axisTick: new UTSJSONObject({ show: false }),
            splitNumber: 2,
            axisLabel: new UTSJSONObject({
              color: "#AEAEAE"
              // formatter:"{value}m"
            }),
            splitLine: new UTSJSONObject({
              show: true,
              lineStyle: new UTSJSONObject({
                color: "#E9E9E9",
                type: [5, 10]
              })
            })
          }),
          series: [
            new UTSJSONObject({
              name: "做题数",
              data: props.options.stackData1,
              type: "bar",
              barWidth: 20,
              itemStyle: new UTSJSONObject({
                borderRadius: [2, 2, 0, 0],
                color: "#22D499"
              })
            }),
            new UTSJSONObject({
              name: "错题数",
              data: props.options.stackData2,
              type: "bar",
              barWidth: 20,
              itemStyle: new UTSJSONObject({
                borderRadius: [2, 2, 0, 0],
                color: "#FF6447"
              })
            })
          ]
        });
        chart === null || chart === void 0 ? null : chart.setOption(chartOption);
      }
      const stop = vue.watch(props.options, () => {
        if (chart == null)
          return null;
        init();
      }, { deep: true });
      const initChart = () => {
        return __awaiter(this, void 0, void 0, function* () {
          if (chartRef.value === null)
            return Promise.resolve(null);
          chart = yield chartRef.value.init(null);
          init();
        });
      };
      vue.onBeforeUnmount(stop);
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "chart" }), [
          vue.createVNode(vue.unref(lEchart), new UTSJSONObject({
            ref_key: "chartRef",
            ref: chartRef,
            onFinished: initChart
          }), null, 512)
        ]);
      };
    }
  });
  const _style_0$h = { "chart": { "": { "height": "100%" } } };
  const chartBar = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["styles", [_style_0$h]]]);
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "chart-line",
    props: {
      options: {
        type: Object,
        default: new UTSJSONObject({})
      }
    },
    setup(__props) {
      const props = __props;
      const chartRef = vue.ref(null);
      let chart = null;
      function init() {
        let chartOption = new UTSJSONObject({
          grid: new UTSJSONObject({
            left: "4%",
            right: "4%",
            top: 30,
            bottom: 30
          }),
          tooltip: new UTSJSONObject({
            show: true,
            trigger: "axis",
            className: "chart-tooltip",
            extraCssText: "",
            formatter(data) {
              const unitValStr = ['<div class="p">'.concat(data[0].name, "</div>")];
              data.forEach((v, i) => {
                unitValStr.push('<div class="p">'.concat(v.marker.replace(/<span/, '<span class="chart-tooltip-dot dot-' + i + '"')).concat(v.seriesName, " ").concat(v.value, "分钟</div>"));
              });
              return unitValStr.join("");
            }
          }),
          xAxis: new UTSJSONObject({
            data: props.options.xAxis,
            axisLabel: new UTSJSONObject({
              color: "#AEAEAE"
            }),
            axisLine: new UTSJSONObject({
              lineStyle: new UTSJSONObject({
                color: "#C6C6C6",
                opacity: 0.7
              })
            }),
            axisTick: new UTSJSONObject({
              show: false
            })
          }),
          yAxis: new UTSJSONObject({
            axisTick: new UTSJSONObject({ show: false }),
            splitNumber: 2,
            axisLabel: new UTSJSONObject({
              color: "#AEAEAE"
              // formatter:"{value}m"
            }),
            splitLine: new UTSJSONObject({
              show: true,
              lineStyle: new UTSJSONObject({
                color: "#E9E9E9",
                type: [5, 10]
              })
            })
          }),
          series: [
            new UTSJSONObject({
              name: "已学习",
              data: props.options.stackData1,
              type: "line",
              // symbolSize:8,
              itemStyle: new UTSJSONObject({
                color: "#A684FF"
              })
            }),
            new UTSJSONObject({
              name: "已掌握",
              data: props.options.stackData2,
              type: "line",
              itemStyle: new UTSJSONObject({
                color: "#22D499"
              })
            })
          ]
        });
        chart === null || chart === void 0 ? null : chart.setOption(chartOption);
      }
      const stop = vue.watch(props.options, () => {
        if (chart == null)
          return null;
        init();
      }, { deep: true });
      const initChart = () => {
        return __awaiter(this, void 0, void 0, function* () {
          if (chartRef.value === null)
            return Promise.resolve(null);
          chart = yield chartRef.value.init(null);
          init();
        });
      };
      vue.onBeforeUnmount(stop);
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "chart" }), [
          vue.createVNode(vue.unref(lEchart), new UTSJSONObject({
            ref_key: "chartRef",
            ref: chartRef,
            onFinished: initChart
          }), null, 512)
        ]);
      };
    }
  });
  const _style_0$g = { "chart": { "": { "height": "100%" } } };
  const chartLine = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["styles", [_style_0$g]]]);
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "week-report",
    setup(__props) {
      const initId = vue.inject("initId", vue.ref(0));
      const reportGenState = vue.ref(0);
      const isLoading = vue.ref(false);
      const date = vue.ref("");
      const statList = vue.reactive([
        new UTSJSONObject({ label: "学习天数(天)", val: "--", tagVal: 0 }),
        new UTSJSONObject({ label: "学习时长(分钟)", val: "--", tagVal: 0 }),
        new UTSJSONObject({ label: "做题数量(道)", val: "--", tagVal: 0 })
      ]);
      const studyMotivation = vue.ref("");
      const weekList = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      const getDate = () => {
        let d = /* @__PURE__ */ new Date();
        let curWeek = d.getDay() == 0 ? d.getDay() : 7;
        let sd = new Date(d.getTime() - (curWeek + 6) * 24 * 60 * 60 * 1e3);
        let ed = new Date(d.getTime() - curWeek * 24 * 60 * 60 * 1e3);
        date.value = "".concat(formatNumer(sd.getMonth() + 1), ".").concat(formatNumer(sd.getDate()), "-").concat(formatNumer(ed.getMonth() + 1), ".").concat(formatNumer(ed.getDate()));
      };
      const baseInfo = vue.reactive(new UTSJSONObject({
        maxLearnLengthWeek: "",
        maxLearnLength: 0,
        maxAnsQuestionWeek: "",
        maxAnsQuestionCount: 0,
        answerQuestionRightRate: 0,
        totalKnowledgeLearnNum: 0,
        totalKnowledgeMasterNum: 0
      }));
      const chartBarOptions1 = vue.reactive(new UTSJSONObject({
        xAxis: weekList,
        stackData1: [0, 0, 0, 0, 0, 0, 0],
        stackData2: [0, 0, 0, 0, 0, 0, 0]
      }));
      const chartBarOptions2 = vue.reactive(new UTSJSONObject({
        xAxis: weekList,
        stackData1: [0, 0, 0, 0, 0, 0, 0],
        stackData2: [0, 0, 0, 0, 0, 0, 0]
      }));
      const chartBarOptions3 = vue.reactive(new UTSJSONObject({
        xAxis: weekList,
        stackData1: [0, 0, 0, 0, 0, 0, 0],
        stackData2: [0, 0, 0, 0, 0, 0, 0]
      }));
      const getData = () => {
        let data = new UTSJSONObject({
          productId: state$1.activeCategory.productId,
          goodsId: state$1.goodsId,
          categoryId: state$1.activeCategory.categoryId,
          reqType: 0
        });
        isLoading.value = true;
        http.get("/japi/al/v7/studyReport/getUserLastWeekReportCategory", data).then((res = null) => {
          var _a, _b, _c, _d, _e, _f;
          let info = respDataAsObject(res);
          isLoading.value = false;
          reportGenState.value = (_a = info.reportGenState) !== null && _a !== void 0 ? _a : 0;
          studyMotivation.value = info.studyMotivation;
          statList[0].val = info.totalLearnDaysCount;
          statList[1].val = info.totalDaysLearnLength;
          statList[1].tagVal = (_b = info.learnLengthAboveRank) !== null && _b !== void 0 ? _b : 0;
          statList[2].val = info.totalAnswerQuestionCount;
          statList[2].tagVal = (_c = info.answerQuestionAboveRank) !== null && _c !== void 0 ? _c : 0;
          baseInfo.answerQuestionRightRate = ((_d = info.answerQuestionRightRate) !== null && _d !== void 0 ? _d : 0) * 100;
          baseInfo.totalKnowledgeLearnNum = (_e = info.totalKnowledgeLearnNum) !== null && _e !== void 0 ? _e : 0;
          baseInfo.totalKnowledgeMasterNum = (_f = info.totalKnowledgeMasterNum) !== null && _f !== void 0 ? _f : 0;
          let list = info.dailyReportStatDTOList;
          let chart1tpl1 = [], chart1tpl2 = [];
          let chart2tpl1 = [], chart2tpl2 = [];
          let chart3tpl1 = [], chart3tpl2 = [];
          list.forEach((item, index) => {
            chart1tpl1.push(item.totalSumLength);
            chart1tpl2.push(item.avgSchoolStudyLength);
            chart2tpl1.push(item.answerNum);
            chart2tpl2.push(item.errorAnswerNum);
            chart3tpl1.push(item.knowledgeLearnNum);
            chart3tpl2.push(item.knowledgeMasterNum);
            if (item.maxLearnLength == true) {
              baseInfo.maxLearnLengthWeek = weekList[index];
              baseInfo.maxLearnLength = item.totalSumLength;
            }
            if (item.maxAnswerNum == true) {
              baseInfo.maxAnsQuestionWeek = weekList[index];
              baseInfo.maxAnsQuestionCount = item.answerNum;
            }
          });
          chartBarOptions1.stackData1 = chart1tpl1;
          chartBarOptions1.stackData2 = chart1tpl2;
          chartBarOptions2.stackData1 = chart2tpl1;
          chartBarOptions2.stackData2 = chart2tpl2;
          chartBarOptions3.stackData1 = chart3tpl1;
          chartBarOptions3.stackData2 = chart3tpl2;
        }).catch(() => {
          isLoading.value = false;
          reportGenState.value = 1;
        });
      };
      const handlerStudy = () => {
        router.go(-1);
      };
      const handlerWrongQuestionList = () => {
        router.app(new RouterOptions({
          url: "app://cspro/wrongQuestionSet",
          query: new UTSJSONObject({
            productId: state$1.activeCategory.productId,
            goodsId: state$1.goodsId,
            categoryId: state$1.activeCategory.categoryId
          })
        }));
      };
      const stop = vue.watch(initId, () => {
        if (state$1.activeCategory.categoryId != null) {
          getData();
        }
      }, { immediate: true });
      vue.onBeforeMount(() => {
        getDate();
      });
      vue.onBeforeUnmount(() => {
        stop();
      });
      return (_ctx = null, _cache = null) => {
        const _component_c_loading = resolveEasycom(vue.resolveDynamicComponent("c-loading"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "week-report" }), [
          vue.createElementVNode("view", new UTSJSONObject({ class: "title" }), [
            vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "上周周报 (" + vue.toDisplayString(vue.unref(date)) + ")", 1)
          ]),
          vue.renderSlot(_ctx.$slots, "default"),
          vue.unref(isLoading) ? (vue.openBlock(), vue.createBlock(_component_c_loading, new UTSJSONObject({ key: 0 }))) : vue.createCommentVNode("", true),
          !vue.unref(isLoading) && vue.unref(reportGenState) != 2 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
            key: 1,
            class: "nothing-tip"
          }), [
            vue.createElementVNode("image", new UTSJSONObject({
              class: "pic",
              mode: "widthFix",
              src: _imports_0$b
            })),
            vue.unref(reportGenState) == 0 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, new UTSJSONObject({ key: 0 }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "p1" }), "您上周没有学习"),
              vue.createElementVNode("text", new UTSJSONObject({ class: "p2" }), "任何时候开始学习都不算晚"),
              vue.createElementVNode("button", new UTSJSONObject({
                class: "btn",
                "hover-class": "none",
                onClick: handlerStudy
              }), "开始学习")
            ], 64)) : vue.createCommentVNode("", true),
            vue.unref(reportGenState) == 1 ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
              key: 1,
              class: "p1"
            }), "报告生成中")) : vue.createCommentVNode("", true)
          ])) : vue.createCommentVNode("", true),
          vue.unref(reportGenState) == 2 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, new UTSJSONObject({ key: 2 }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "section base-section" }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "stat-box" }), [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(statList), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    class: "item",
                    key: index
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "value" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), vue.toDisplayString(item.val), 1),
                      item.tagVal != 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                        key: 0,
                        class: "tag"
                      }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "超过" + vue.toDisplayString(item.tagVal) + "%学员", 1)
                      ])) : vue.createCommentVNode("", true)
                    ]),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "label" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), vue.toDisplayString(item.label), 1)
                    ])
                  ]);
                }), 128))
              ]),
              vue.unref(studyMotivation) != "" ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                key: 0,
                class: "study-tip"
              }), [
                vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "“" + vue.toDisplayString(vue.unref(studyMotivation)) + "”", 1)
              ])) : vue.createCommentVNode("", true)
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "section" }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "section-title" }), [
                vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "学习时长")
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "sub-title" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "text" }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "上" + vue.toDisplayString(vue.unref(baseInfo).maxLearnLengthWeek), 1),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "n" }), vue.toDisplayString(vue.unref(baseInfo).maxLearnLength) + "分钟", 1)
                ])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "chart-box" }), [
                vue.createVNode(vue.unref(chartBarLine), new UTSJSONObject({ options: vue.unref(chartBarOptions1) }), null, 8, ["options"])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "graphic" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "item item-01" }), [
                  vue.createElementVNode("image", new UTSJSONObject({
                    class: "dot",
                    src: _imports_1$8
                  })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "网校均值")
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "item item-02" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "dot" })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "学习时长")
                ])
              ])
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "section ans-section" }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "section-title" }), [
                vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "做题数量")
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "sub-title" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "text" }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "上" + vue.toDisplayString(vue.unref(baseInfo).maxAnsQuestionWeek) + "刷题最多共", 1),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "n" }), vue.toDisplayString(vue.unref(baseInfo).maxAnsQuestionCount), 1),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "道"),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "l" })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "平均正确率"),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "n" }), vue.toDisplayString(vue.unref(baseInfo).answerQuestionRightRate) + "%", 1)
                ]),
                vue.createElementVNode("view", new UTSJSONObject({
                  class: "btn",
                  onClick: handlerWrongQuestionList
                }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "b-t" }), "查看错题本 >")
                ])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "chart-box" }), [
                vue.createVNode(vue.unref(chartBar), new UTSJSONObject({ options: vue.unref(chartBarOptions2) }), null, 8, ["options"])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "graphic" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "item item-01" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "dot" })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "做题数")
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "item item-02" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "dot" })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "错题数")
                ])
              ])
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "section knowge-section" }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "section-title" }), [
                vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "知识点掌握")
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "sub-title" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "text" }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "上周共学知识点/已掌握知识点 " + vue.toDisplayString(vue.unref(baseInfo).totalKnowledgeLearnNum) + "/" + vue.toDisplayString(vue.unref(baseInfo).totalKnowledgeMasterNum), 1)
                ])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "chart-box" }), [
                vue.createVNode(vue.unref(chartLine), new UTSJSONObject({ options: vue.unref(chartBarOptions3) }), null, 8, ["options"])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "graphic" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "item item-01" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "dot" })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "已学习知识点数量")
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "item item-02" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "dot" })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "已掌握知识点数量")
                ])
              ])
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "section footer" }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "p" }), [
                vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "该报告是基于一周（" + vue.toDisplayString(vue.unref(date)) + "）学习数据生成", 1)
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "p" }), [
                vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "反映的是当周的学习表现")
              ])
            ])
          ], 64)) : vue.createCommentVNode("", true)
        ]);
      };
    }
  });
  const _style_0$f = { "week-report": { "": { "minHeight": "400rpx" } }, "title": { "": { "marginBottom": "28rpx" } }, "text": { ".title ": { "fontWeight": "700", "fontSize": "10rpx", "color": "#171921", "lineHeight": "15rpx" }, ".section-title ": { "fontWeight": "700", "fontSize": "10rpx", "color": "#171921", "lineHeight": "15rpx" }, ".sub-title ": { "flexDirection": "row", "alignItems": "center" }, ".stat-box .item .value ": { "fontWeight": "bold", "fontSize": "18rpx", "color": "#001932", "lineHeight": "20rpx" }, ".stat-box .item .label ": { "fontSize": "8rpx", "color": "#747491", "lineHeight": "10rpx" }, ".study-tip ": { "fontSize": "8rpx", "color": "rgba(116,116,145,0.46)", "lineHeight": "12rpx" }, ".footer ": { "fontSize": "7rpx", "color": "#747491", "lineHeight": "10rpx", "textAlign": "center" }, ".graphic .item ": { "fontSize": "8rpx", "color": "#9A9A9A", "lineHeight": "10rpx" } }, "nothing-tip": { "": { "paddingTop": "50rpx", "alignItems": "center" } }, "pic": { ".nothing-tip ": { "width": "64rpx", "marginBottom": "14rpx" } }, "p1": { ".nothing-tip ": { "fontWeight": "700", "fontSize": "10rpx", "color": "#010B16", "lineHeight": "13rpx", "marginBottom": "7rpx" } }, "p2": { ".nothing-tip ": { "fontSize": "9rpx", "color": "#747491", "lineHeight": "11rpx", "marginBottom": "32rpx" } }, "btn": { ".nothing-tip ": { "width": "88rpx", "height": "25rpx", "backgroundImage": "linear-gradient(270deg, #6474FF, #A684FF)", "backgroundColor": "rgba(0,0,0,0)", "borderTopLeftRadius": "13rpx", "borderTopRightRadius": "13rpx", "borderBottomRightRadius": "13rpx", "borderBottomLeftRadius": "13rpx", "fontWeight": "700", "fontSize": "8rpx", "color": "#FFFFFF", "lineHeight": "25rpx" } }, "section": { "": { "marginBottom": "42rpx" } }, "section-title": { "": { "marginBottom": "4rpx" } }, "sub-title": { "": { "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "4rpx" } }, "t": { ".sub-title ": { "fontSize": "8rpx", "color": "#9A9A9A", "lineHeight": "11rpx" }, ".stat-box .item .tag ": { "whiteSpace": "nowrap", "fontSize": "7rpx", "color": "#525EFB", "lineHeight": "10rpx" } }, "n": { ".sub-title ": { "fontSize": "8rpx", "color": "#525EFB", "lineHeight": "11rpx", "paddingLeft": "2rpx", "fontWeight": "700" } }, "l": { ".sub-title ": { "width": "1rpx", "height": "5rpx", "backgroundColor": "#E9E9E9", "marginTop": 0, "marginRight": "7rpx", "marginBottom": 0, "marginLeft": "7rpx" } }, "b-t": { ".sub-title .btn ": { "fontSize": "8rpx", "color": "#525EFB", "lineHeight": "10rpx" } }, "base-section": { "": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "paddingTop": "30rpx" } }, "stat-box": { "": { "display": "flex", "flexDirection": "row", "overflow": "visible" } }, "item": { ".stat-box ": { "marginRight": "24rpx", "display": "flex", "alignItems": "center", "overflow": "visible", "marginRight:last-child": 0 }, ".graphic ": { "flexDirection": "row", "alignItems": "center", "marginLeft": "12rpx" } }, "value": { ".stat-box .item ": { "marginBottom": "4rpx", "display": "flex", "flexDirection": "row", "alignItems": "flex-end", "overflow": "visible" } }, "tag": { ".stat-box .item ": { "position": "absolute", "right": "-2rpx", "top": "-10rpx", "zIndex": 1, "backgroundImage": "none", "backgroundColor": "#F0F3FF", "borderTopLeftRadius": "7rpx", "borderTopRightRadius": "7rpx", "borderBottomRightRadius": "7rpx", "borderBottomLeftRadius": "1rpx", "paddingTop": "2rpx", "paddingRight": "5rpx", "paddingBottom": "2rpx", "paddingLeft": "5rpx", "transform": "translateX(100%)" } }, "chart-box": { "": { "height": "150rpx" } }, "footer": { "": { "!marginBottom": 0 } }, "p": { ".footer ": { "marginBottom": "4rpx" } }, "graphic": { "": { "flexDirection": "row", "justifyContent": "flex-end" } }, "dot": { ".graphic .item ": { "width": "6rpx", "height": "6rpx", "marginRight": "2rpx" }, ".graphic .item-02 ": { "backgroundImage": "linear-gradient(180deg, #819FFF, #3F6EFF)", "backgroundColor": "rgba(0,0,0,0)", "borderTopLeftRadius": "1rpx", "borderTopRightRadius": "1rpx", "borderBottomRightRadius": "1rpx", "borderBottomLeftRadius": "1rpx" }, ".ans-section .graphic .item-01 ": { "backgroundImage": "none", "backgroundColor": "#22D499", "borderTopLeftRadius": "1rpx", "borderTopRightRadius": "1rpx", "borderBottomRightRadius": "1rpx", "borderBottomLeftRadius": "1rpx" }, ".ans-section .graphic .item-02 ": { "backgroundImage": "none", "backgroundColor": "#FF6447", "borderTopLeftRadius": "1rpx", "borderTopRightRadius": "1rpx", "borderBottomRightRadius": "1rpx", "borderBottomLeftRadius": "1rpx" }, ".knowge-section .graphic .item-01 ": { "backgroundImage": "linear-gradient(180deg, #A684FF, #6474FF)", "backgroundColor": "rgba(0,0,0,0)", "borderTopLeftRadius": "3rpx", "borderTopRightRadius": "3rpx", "borderBottomRightRadius": "3rpx", "borderBottomLeftRadius": "3rpx" }, ".knowge-section .graphic .item-02 ": { "backgroundImage": "none", "backgroundColor": "#22D499", "borderTopLeftRadius": "3rpx", "borderTopRightRadius": "3rpx", "borderBottomRightRadius": "3rpx", "borderBottomLeftRadius": "3rpx" } } };
  const weekReport = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["styles", [_style_0$f]]]);
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const initId = vue.ref(0);
      vue.provide("initId", initId);
      const tabList = [
        new UTSJSONObject({ name: "总报" }),
        new UTSJSONObject({ name: "周报" })
      ];
      const activeIndex = vue.ref(0);
      const countdownList = vue.ref(["0", "0"]);
      const getAlCountDown = () => {
        let data = new UTSJSONObject({
          productId: state$1.activeCategory.productId,
          categoryId: state$1.activeCategory.categoryId
        });
        http.get("/japi/al/v3/getAlCountDown", data).then((res = null) => {
          var _a;
          let countdown = 0;
          let info = (_a = res) === null || _a === void 0 ? null : _a.data;
          if (info != null) {
            countdown = info.countdown;
          }
          countdownList.value = countdown.toString().padStart(2, "0").split("");
        });
      };
      const tabChange = (item, index) => {
        activeIndex.value = index;
      };
      function init() {
        getAlCountDown();
      }
      const handlerCategoryChange = (item) => {
        initId.value += 1;
        init();
      };
      vue.onLoad((e) => {
        activeIndex.value = e.tabIndex != null ? parseInt(e.tabIndex) : 0;
        uni.__log__("log", "at pages/study-report/index.uvue:77", 11111, activeIndex.value);
        categoryInitState(e).then((activeCategoryInfo) => {
          initId.value += 1;
          init();
        });
      });
      vue.onPageShow(() => {
        if (state$1.activeCategory.categoryId != null) {
          initId.value += 1;
          init();
        }
      });
      return (_ctx = null, _cache = null) => {
        const _component_c_tab = resolveEasycom(vue.resolveDynamicComponent("c-tab"), __easycom_0$2);
        const _component_c_navbar = resolveEasycom(vue.resolveDynamicComponent("c-navbar"), __easycom_3);
        const _component_c_category_tab = resolveEasycom(vue.resolveDynamicComponent("c-category-tab"), __easycom_4);
        return vue.openBlock(), vue.createElementBlock("scroll-view", new UTSJSONObject({ style: new UTSJSONObject({ "flex": "1" }) }), [
          vue.createElementVNode("image", new UTSJSONObject({
            class: "page-bg",
            src: _imports_0$c
          })),
          vue.createVNode(_component_c_navbar, new UTSJSONObject({ class: "navbar" }), {
            ["navbar-right"]: vue.withCtx(() => {
              return [
                vue.createElementVNode("view", new UTSJSONObject({ class: "countdown" }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text text-1" }), "距离考试还有"),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(countdownList), (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                      class: "cell",
                      key: index
                    }), vue.toDisplayString(item), 1);
                  }), 128)),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "天")
                ])
              ];
            }),
            default: vue.withCtx(() => {
              return [
                vue.createVNode(_component_c_tab, new UTSJSONObject({
                  list: tabList,
                  onChange: tabChange,
                  defaultIndex: vue.unref(activeIndex)
                }), null, 8, ["defaultIndex"])
              ];
            }),
            _: 2
          }, 1024),
          vue.createElementVNode("scroll-view", new UTSJSONObject({
            class: "page-scroll-view",
            style: new UTSJSONObject({ "flex": "1" })
          }), [
            (vue.openBlock(), vue.createBlock(vue.KeepAlive, null, [
              vue.unref(activeIndex) == 0 ? (vue.openBlock(), vue.createBlock(vue.unref(totalReport), new UTSJSONObject({
                key: 0,
                style: new UTSJSONObject({ "padding": "16rpx 60rpx" })
              }), new UTSJSONObject({
                default: vue.withCtx(() => {
                  return [
                    vue.createVNode(_component_c_category_tab, new UTSJSONObject({ onChange: handlerCategoryChange }))
                  ];
                }),
                _: 1
              }))) : vue.createCommentVNode("", true)
            ], 1024)),
            (vue.openBlock(), vue.createBlock(vue.KeepAlive, null, [
              vue.unref(activeIndex) == 1 ? (vue.openBlock(), vue.createBlock(vue.unref(weekReport), new UTSJSONObject({
                key: 0,
                style: new UTSJSONObject({ "padding": "16rpx 60rpx" })
              }), new UTSJSONObject({
                default: vue.withCtx(() => {
                  return [
                    vue.createVNode(_component_c_category_tab, new UTSJSONObject({ onChange: handlerCategoryChange }))
                  ];
                }),
                _: 1
              }))) : vue.createCommentVNode("", true)
            ], 1024))
          ])
        ]);
      };
    }
  });
  const _style_0$e = { "page-bg": { "": { "position": "absolute", "left": 0, "top": 0, "zIndex": -1, "width": "100%", "height": "100%" } }, "navbar-content": { "": { "display": "flex", "flexDirection": "row", "justifyContent": "center", "position": "relative" } }, "countdown": { "": { "height": "100%", "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "text": { ".countdown ": { "fontSize": "8rpx", "color": "#121212" } }, "text-1": { ".countdown ": { "marginRight": "2rpx" } }, "cell": { ".countdown ": { "paddingTop": 0, "paddingRight": "2rpx", "paddingBottom": 0, "paddingLeft": "2rpx", "backgroundColor": "#525EFB", "marginRight": "2rpx", "color": "#ffffff", "fontSize": "8rpx", "height": "10rpx", "lineHeight": "10rpx" } } };
  const PagesStudyReportIndex = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["styles", [_style_0$e]]]);
  const _imports_0$9 = "/static/images/ico-collection.png";
  const _imports_1$7 = "/static/images/ico-clock.png";
  const _imports_2$3 = "/static/images/ico-topic-1.png";
  const _imports_3$2 = "/static/images/ico-topic-2.png";
  const _imports_4$1 = "/static/images/ico-topic-3.png";
  const _imports_5$1 = "/static/images/ico-topic-4.png";
  const _imports_6$1 = "/static/images/ico-topic-5.png";
  const _imports_7$1 = "/static/images/ico-high-fre-1.png";
  const _imports_8$1 = "/static/images/ico-high-fre-2.png";
  const _imports_9 = "/static/images/ico-high-fre-3.png";
  const _imports_10 = "/static/images/ico-real-ques.png";
  const _imports_0$8 = "/static/images/ico-tree-level-0.png";
  const _imports_1$6 = "/static/images/ico-tree-level-1.png";
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "chapter-tree",
    props: {
      list: {
        type: Array
      },
      isShowRight: {
        type: Boolean,
        default: false
      },
      isInit: {
        type: Boolean,
        default: false
      }
    },
    emits: ["look", "do"],
    setup(__props, _a) {
      var __emit = _a.emit;
      const props = __props;
      const emits = __emit;
      let insList = vue.ref([]);
      const expandChange = (item) => {
        if (item.isExpand == null)
          return null;
        item.isExpand = !item.isExpand;
      };
      const handlerDo = (item, index) => {
        emits("do", item, index);
      };
      const handlerLook = (item, index) => {
        emits("look", item, index);
      };
      const handler = (item, index) => {
        if (props.isShowRight) {
          expandChange(item);
        } else {
          handlerDo(item, index);
        }
      };
      function formatList(list) {
        list.forEach((item) => {
          if (item.children != null) {
            item.isExpand = false;
            item.children = formatList(item.children);
          }
        });
        return list;
      }
      vue.watchEffect(() => {
        const list = props.list;
        if (list != null) {
          if (!props.isInit) {
            insList.value = formatList(list);
          } else {
            insList.value = list;
          }
        }
      });
      return (_ctx = null, _cache = null) => {
        const _component_chapter_tree = vue.resolveComponent("chapter-tree", true);
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "chapter-container" }), [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(insList), (item, index) => {
            var _a2, _b, _c;
            return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
              class: "tree",
              key: index
            }), [
              vue.createElementVNode("view", new UTSJSONObject({
                class: "chapter-tree-item",
                onClick: ($event = null) => {
                  return handler(item, index);
                }
              }), [
                vue.createElementVNode("view", new UTSJSONObject({
                  class: vue.normalizeClass(["ico", new UTSJSONObject({ expand: item.isExpand })]),
                  onClick: vue.withModifiers(($event = null) => {
                    return expandChange(item);
                  }, ["stop"])
                }), [
                  item.level == 1 && item.children != null ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                    key: 0,
                    class: "pic",
                    src: _imports_0$8
                  }))) : item.children != null ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                    key: 1,
                    class: "pic",
                    src: _imports_1$6
                  }))) : vue.createCommentVNode("", true)
                ], 10, ["onClick"]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "info" }), [
                  vue.createElementVNode("text", new UTSJSONObject({
                    class: "name",
                    "max-lines": 2
                  }), vue.toDisplayString(item.name), 1),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "down" }), [
                    vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "已完成 " + vue.toDisplayString((_a2 = item.finishQuestionCount) !== null && _a2 !== void 0 ? _a2 : 0) + "/" + vue.toDisplayString((_b = item.allQuestionCount) !== null && _b !== void 0 ? _b : 0), 1),
                    item.finishQuestionCount != 0 && item.finishQuestionCount != null ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                      key: 0,
                      class: "text"
                    }), " 正确率 " + vue.toDisplayString((_c = item.correctRate) !== null && _c !== void 0 ? _c : 0) + "% ", 1)) : vue.createCommentVNode("", true)
                  ])
                ]),
                __props.isShowRight ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                  key: 0,
                  class: "action"
                }), [
                  item.allQuestionCount == item.questionCount ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                    key: 0,
                    class: "btn",
                    onClick: vue.withModifiers(($event = null) => {
                      return handlerLook(item, index);
                    }, ["stop"])
                  }), "解析", 8, ["onClick"])) : vue.createCommentVNode("", true),
                  vue.createElementVNode("text", new UTSJSONObject({
                    class: "btn",
                    onClick: vue.withModifiers(($event = null) => {
                      return handlerDo(item, index);
                    }, ["stop"])
                  }), "做题", 8, ["onClick"])
                ])) : vue.createCommentVNode("", true)
              ], 8, ["onClick"]),
              item.children != null ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_chapter_tree, new UTSJSONObject({
                key: 0,
                list: item.children,
                isShowRight: __props.isShowRight,
                isInit: true,
                onLook: handlerLook,
                onDo: handlerDo
              }), null, 8, ["list", "isShowRight"])), [
                [vue.vShow, item.isExpand == true]
              ]) : vue.createCommentVNode("", true)
            ]);
          }), 128))
        ]);
      };
    }
  });
  const _style_0$d = { "chapter-tree-item": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "marginBottom": "14.5rpx" } }, "ico": { "": { "width": "12.5rpx", "height": "12.5rpx", "marginRight": "6.2rpx", "transform": "rotate(180deg)", "transitionProperty": "all", "transitionDuration": "0.3s" }, ".expand": { "transform": "rotate(0deg)" } }, "pic": { ".ico ": { "width": "100%", "height": "100%" } }, "info": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } }, "name": { "": { "fontWeight": "700", "fontSize": "10rpx", "color": "#1B1B48", "lineHeight": "17rpx", "marginBottom": "5.2rpx", "lines": 2, "overflow": "hidden", "textOverflow": "ellipsis" } }, "down": { "": { "display": "flex", "flexDirection": "row" } }, "text": { ".down ": { "fontSize": "8rpx", "color": "#8F8FA6", "lineHeight": "10rpx", "marginRight": "4.1rpx" } }, "action": { "": { "display": "flex", "flexDirection": "row" } }, "btn": { ".action ": { "paddingTop": 0, "paddingRight": "16rpx", "paddingBottom": 0, "paddingLeft": "16rpx", "fontWeight": "700", "fontSize": "9rpx", "color": "#4F46E5", "lineHeight": "20rpx", "marginLeft": "8rpx" } }, "@TRANSITION": { "ico": { "property": "all", "duration": "0.3s" } } };
  const chapterTree = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["styles", [_style_0$d]]]);
  const _imports_0$7 = "/static/images/ico-custom-close.png";
  const _imports_1$5 = "/static/images/ico-custom-checked.png";
  const _imports_2$2 = "/static/images/ico-slider-dot.png";
  const _imports_3$1 = "/static/images/ico-slider-label-bg.png";
  class ListItem extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            title: { type: String, optional: false },
            value: { type: "Unknown", optional: false }
          };
        }
      };
    }
    constructor(options, metadata = ListItem.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.title = this.__props__.title;
      this.value = this.__props__.value;
      delete this.__props__;
    }
  }
  class GroupItem extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            title: { type: String, optional: false },
            valKey: { type: "Unknown", optional: false },
            selectType: { type: "Unknown", optional: false },
            list: { type: "Unknown", optional: false }
          };
        }
      };
    }
    constructor(options, metadata = GroupItem.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.title = this.__props__.title;
      this.valKey = this.__props__.valKey;
      this.selectType = this.__props__.selectType;
      this.list = this.__props__.list;
      delete this.__props__;
    }
  }
  class ModelType extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            questionTypes: { type: "Unknown", optional: false },
            kmasters: { type: "Unknown", optional: false },
            answerState: { type: "Unknown", optional: false },
            yearRange: { type: "Unknown", optional: false },
            questionCount: { type: Number, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = ModelType.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.questionTypes = this.__props__.questionTypes;
      this.kmasters = this.__props__.kmasters;
      this.answerState = this.__props__.answerState;
      this.yearRange = this.__props__.yearRange;
      this.questionCount = this.__props__.questionCount;
      delete this.__props__;
    }
  }
  const step = 5;
  const max = 50;
  class MarkItem extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            value: { type: Number, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = MarkItem.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.value = this.__props__.value;
      delete this.__props__;
    }
  }
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "custom-modal",
    props: {
      title: {
        type: String,
        default: "自定义刷题"
      },
      qTypeList: {
        type: Array
      }
    },
    emits: ["close", "confirm"],
    setup(__props, _a) {
      var __emit = _a.emit;
      const props = __props;
      const emit = __emit;
      const groupList = vue.reactive([
        new GroupItem({
          title: "题目年份",
          valKey: "yearRange",
          selectType: "radio",
          list: [
            new ListItem({ title: "全部", value: "all" }),
            new ListItem({ title: "近1年", value: 1 }),
            new ListItem({ title: "近3年", value: 3 }),
            new ListItem({ title: "近5年", value: 5 })
          ]
        }),
        new GroupItem({
          title: "题型",
          valKey: "questionTypes",
          selectType: "checkbox",
          list: [
            // { title:'单选题',value:0},
            // { title:'多选题',value:1},
            // { title:'不定项选择题',value:2},
            // { title:'判断题', value:3},
            // { title:'简答题', value:4},
            // { title:'填空题', value:5},
            // { title:'案例题', value:6},
          ]
        }),
        new GroupItem({
          title: "类型",
          valKey: "answerState",
          selectType: "radio",
          list: [
            new ListItem({ title: "全部", value: "all" }),
            new ListItem({ title: "未做", value: 2 }),
            new ListItem({ title: "已做", value: 1 }),
            new ListItem({ title: "错题", value: 3 })
          ]
        }),
        new GroupItem({
          title: "重要程度",
          valKey: "kmasters",
          selectType: "radio",
          list: [
            new ListItem({ title: "全部", value: "all" }),
            new ListItem({ title: "必会", value: 1 }),
            new ListItem({ title: "重要", value: 2 }),
            new ListItem({ title: "了解", value: 4 })
          ]
        })
      ]);
      const model = vue.reactive(new ModelType({
        questionTypes: ["all"],
        kmasters: ["all"],
        answerState: ["all"],
        yearRange: ["all"],
        questionCount: 15
      }));
      const marks = [
        new MarkItem({ value: 0 }),
        new MarkItem({ value: 10 }),
        new MarkItem({ value: 20 }),
        new MarkItem({ value: 30 }),
        new MarkItem({ value: 40 }),
        new MarkItem({ value: 50 })
      ];
      const change = (item, groupItem) => {
        let valKey = groupItem.valKey;
        if (groupItem.selectType === "radio") {
          model[valKey] = [item.value];
        } else {
          if (item.value == "all") {
            model[valKey] = [item.value];
          } else {
            let field = model[valKey];
            let allIndex = field.indexOf("all");
            let activeIndex = field.indexOf(item.value);
            if (allIndex > -1) {
              field.splice(allIndex, 1);
            }
            if (activeIndex == -1) {
              field.push(item.value);
            } else {
              field.splice(activeIndex, 1);
            }
            if (field.length == 0) {
              model[valKey] = ["all"];
            }
          }
        }
      };
      const sliderChange = (e) => {
        uni.__log__("log", "at pages/topic/modules/custom-modal.uvue:198", e);
        model.questionCount = e.detail.value;
      };
      const close = () => {
        return emit("close");
      };
      const confirm = () => {
        close();
        emit("confirm", new UTSJSONObject(Object.assign({}, model)));
      };
      vue.watchEffect(() => {
        var _a2;
        let qTypeList = (_a2 = props.qTypeList) !== null && _a2 !== void 0 ? _a2 : new Array();
        let list = [];
        qTypeList.forEach((item) => {
          list.push(new ListItem({
            title: item.title,
            value: item.value
          }));
        });
        groupList[1].list = list;
      });
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "modal" }), [
          vue.createElementVNode("view", new UTSJSONObject({ class: "mask" })),
          vue.createElementVNode("view", new UTSJSONObject({ class: "popup" }), [
            vue.createElementVNode("view", new UTSJSONObject({
              class: "close",
              onClick: close
            }), [
              vue.createElementVNode("image", new UTSJSONObject({
                class: "pic",
                src: _imports_0$7
              }))
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "top" }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "title" }), vue.toDisplayString(__props.title), 1),
              vue.createElementVNode("text", new UTSJSONObject({ class: "sub-title" }), "上次未完成的题组不受此筛选影响")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("view", new UTSJSONObject({ class: "group-list" }), [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(groupList), (groupItem, groupIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    class: "group-item",
                    key: groupIndex
                  }), [
                    vue.createElementVNode("text", new UTSJSONObject({ class: "h" }), vue.toDisplayString(groupItem.title), 1),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "list" }), [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(groupItem.list, (item, index) => {
                        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                          class: vue.normalizeClass(["item", new UTSJSONObject({ active: vue.unref(model)[groupItem.valKey].includes(item.value) })]),
                          key: index,
                          onClick: ($event = null) => {
                            return change(item, groupItem);
                          }
                        }), [
                          vue.withDirectives(vue.createElementVNode("image", new UTSJSONObject({
                            class: "ico",
                            src: _imports_1$5
                          }), null, 512), [
                            [vue.vShow, vue.unref(model)[groupItem.valKey].includes(item.value)]
                          ]),
                          vue.createElementVNode("text", new UTSJSONObject({
                            class: vue.normalizeClass(["text", new UTSJSONObject({ active: vue.unref(model)[groupItem.valKey].includes(item.value) })])
                          }), vue.toDisplayString(item.title), 3)
                        ], 10, ["onClick"]);
                      }), 128))
                    ])
                  ]);
                }), 128)),
                vue.createElementVNode("view", new UTSJSONObject({ class: "group-item num-group-item" }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "h" }), "数量"),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "slider-box" }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "range" }), [
                      vue.createElementVNode("view", new UTSJSONObject({ class: "line" })),
                      vue.createElementVNode("view", new UTSJSONObject({
                        class: "progress-line",
                        style: vue.normalizeStyle({ width: "".concat(vue.unref(model).questionCount / max * 100, "%") })
                      }), [
                        vue.createElementVNode("image", new UTSJSONObject({
                          class: "pointer-pic",
                          src: _imports_2$2
                        })),
                        vue.createElementVNode("view", new UTSJSONObject({ class: "pointer-label" }), [
                          vue.createElementVNode("image", new UTSJSONObject({
                            class: "pointer-label-bg",
                            src: _imports_3$1
                          })),
                          vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), vue.toDisplayString(vue.unref(model).questionCount), 1)
                        ])
                      ], 4),
                      vue.createElementVNode("slider", new UTSJSONObject({
                        class: "slider",
                        min: 0,
                        max: 50,
                        step,
                        value: vue.unref(model).questionCount,
                        "block-size": 14,
                        onChanging: sliderChange
                      }), null, 40, ["value"])
                    ]),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "mark-list" }), [
                      (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(marks, (item, index) => {
                        return vue.createElementVNode("text", new UTSJSONObject({
                          class: "mark-item",
                          style: vue.normalizeStyle({ left: "".concat(item.value / max * 100, "%") }),
                          key: index
                        }), vue.toDisplayString(item.value) + "道 ", 5);
                      }), 64))
                    ])
                  ])
                ])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "footer" }), [
                vue.createElementVNode("button", new UTSJSONObject({
                  class: "btn btn-1",
                  "hover-class": "none",
                  onClick: close
                }), "取消"),
                vue.createElementVNode("button", new UTSJSONObject({
                  class: "btn btn-2",
                  "hover-class": "none",
                  onClick: confirm
                }), "开始练习")
              ])
            ])
          ])
        ]);
      };
    }
  });
  const _style_0$c = { "modal": { "": { "width": "100%", "height": "100%", "position": "fixed", "left": 0, "top": 0, "zIndex": 9 } }, "mask": { "": { "width": "100%", "height": "100%", "position": "absolute", "left": 0, "top": 0, "backgroundImage": "none", "backgroundColor": "rgba(0,0,0,0.5)" } }, "popup": { "": { "position": "absolute", "left": "50%", "top": "50%", "transform": "translate(-50%, -50%)", "width": "300rpx", "backgroundImage": "none", "backgroundColor": "#FFFFFF", "boxShadow": "0rpx 2rpx 6rpx 2rpx rgba(55, 53, 87, 0.12)", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "4rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": "4rpx", "borderTopWidth": "0rpx", "borderRightWidth": "0rpx", "borderBottomWidth": "0rpx", "borderLeftWidth": "0rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(151,150,175,0.24)", "borderRightColor": "rgba(151,150,175,0.24)", "borderBottomColor": "rgba(151,150,175,0.24)", "borderLeftColor": "rgba(151,150,175,0.24)", "paddingTop": "8.5rpx", "paddingRight": 0, "paddingBottom": "12.5rpx", "paddingLeft": 0 } }, "close": { "": { "width": "10rpx", "height": "10rpx", "position": "absolute", "right": "8.5rpx", "top": "10rpx", "zIndex": 1, "justifyContent": "center", "alignItems": "center" } }, "pic": { ".close ": { "width": "6.5rpx", "height": "6.5rpx" } }, "top": { "": { "alignItems": "center", "marginBottom": "5.5rpx" } }, "title": { ".top ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#1B1B48", "lineHeight": "13rpx", "marginBottom": "3rpx" } }, "sub-title": { ".top ": { "fontSize": "7rpx", "color": "#9796AF", "lineHeight": "8rpx" } }, "group-list": { "": { "paddingTop": 0, "paddingRight": "14.5rpx", "paddingBottom": 0, "paddingLeft": "14.5rpx", "overflow": "visible", "marginBottom": "19rpx" } }, "group-item": { "": { "marginBottom": "4rpx", "overflow": "visible" } }, "h": { ".group-item ": { "fontSize": "8rpx", "color": "#6C6E8C", "lineHeight": "11rpx", "marginBottom": "6.25rpx" }, ".num-group-item ": { "marginBottom": "4rpx" } }, "list": { ".group-item ": { "display": "flex", "flexDirection": "row", "flexWrap": "wrap" } }, "item": { ".group-item ": { "minWidth": "30rpx", "height": "21rpx", "backgroundImage": "none", "backgroundColor": "#F3F3FB", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "4rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": "4rpx", "paddingTop": 0, "paddingRight": "11.5rpx", "paddingBottom": 0, "paddingLeft": "11.5rpx", "marginRight": "11.3rpx", "marginBottom": "7.3rpx", "flexShrink": 0, "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#F3F3FB", "borderRightColor": "#F3F3FB", "borderBottomColor": "#F3F3FB", "borderLeftColor": "#F3F3FB", "position": "relative", "display": "flex", "justifyContent": "center", "alignItems": "center" }, ".group-item .active": { "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#4F46E5", "borderRightColor": "#4F46E5", "borderBottomColor": "#4F46E5", "borderLeftColor": "#4F46E5" } }, "ico": { ".group-item .item ": { "width": "11.46rpx", "height": "11.46rpx", "position": "absolute", "right": "-1rpx", "top": "-1rpx", "zIndex": 1 } }, "text": { ".group-item ": { "fontSize": "8rpx", "color": "#3F3F3F", "lineHeight": "10rpx" }, ".group-item .active": { "color": "#4F46E5", "fontWeight": "700" }, ".slider-box .progress-line .pointer-label ": { "fontWeight": "700", "fontSize": "8rpx", "color": "#4F46E5", "lineHeight": "14rpx", "textAlign": "center" } }, "num-group-item": { "": { "marginBottom": "0rpx" } }, "slider-box": { "": { "paddingTop": "15.6rpx", "overflow": "visible" } }, "range": { ".slider-box ": { "height": "12.5rpx", "overflow": "visible", "position": "relative", "justifyContent": "center", "alignItems": "center", "marginBottom": "1.6rpx" } }, "line": { ".slider-box .range ": { "width": "100%", "height": "4rpx", "backgroundImage": "none", "backgroundColor": "#F3F3FB", "borderTopLeftRadius": "2rpx", "borderTopRightRadius": "2rpx", "borderBottomRightRadius": "2rpx", "borderBottomLeftRadius": "2rpx" } }, "progress-line": { ".slider-box ": { "position": "absolute", "left": 0, "top": "50%", "transform": "translateY(-50%)", "height": "4rpx", "borderTopLeftRadius": "2rpx", "borderTopRightRadius": "2rpx", "borderBottomRightRadius": "2rpx", "borderBottomLeftRadius": "2rpx", "backgroundImage": "none", "backgroundColor": "#4F46E5", "overflow": "visible" } }, "pointer-pic": { ".slider-box .progress-line ": { "width": "12.5rpx", "height": "12.5rpx", "borderTopLeftRadius": "7rpx", "borderTopRightRadius": "7rpx", "borderBottomRightRadius": "7rpx", "borderBottomLeftRadius": "7rpx", "position": "absolute", "right": "0rpx", "top": "50%", "transform": "translate(50%, -50%)" } }, "pointer-label": { ".slider-box .progress-line ": { "width": "27.08rpx", "height": "15.63rpx", "position": "absolute", "top": "-6.25rpx", "right": "0rpx", "transform": "translate(50%, -100%)" } }, "pointer-label-bg": { ".slider-box .progress-line .pointer-label ": { "position": "absolute", "left": 0, "top": 0, "width": "100%", "height": "100%" } }, "slider": { ".slider-box ": { "position": "absolute", "left": 0, "top": "50%", "zIndex": 9, "width": "100%", "transform": "translateY(-50%)", "opacity": 0 } }, "mark-list": { ".slider-box ": { "height": "11rpx", "position": "relative", "overflow": "visible" } }, "mark-item": { ".slider-box ": { "position": "absolute", "bottom": 0, "left": 0, "fontSize": "8rpx", "color": "#747491", "lineHeight": "9rpx", "whiteSpace": "nowrap", "transform": "translateX(-50%)" } }, "footer": { "": { "display": "flex", "flexDirection": "row", "justifyContent": "center" } }, "btn": { ".footer ": { "marginTop": 0, "marginRight": "10rpx", "marginBottom": 0, "marginLeft": "10rpx", "width": "60rpx", "height": "21rpx", "borderTopLeftRadius": "11rpx", "borderTopRightRadius": "11rpx", "borderBottomRightRadius": "11rpx", "borderBottomLeftRadius": "11rpx", "fontWeight": "700", "fontSize": "8rpx", "lineHeight": "21rpx", "borderTopWidth": "medium", "borderRightWidth": "medium", "borderBottomWidth": "medium", "borderLeftWidth": "medium", "borderTopStyle": "none", "borderRightStyle": "none", "borderBottomStyle": "none", "borderLeftStyle": "none", "borderTopColor": "#000000", "borderRightColor": "#000000", "borderBottomColor": "#000000", "borderLeftColor": "#000000", "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "borderTopWidth:after": "medium", "borderRightWidth:after": "medium", "borderBottomWidth:after": "medium", "borderLeftWidth:after": "medium", "borderTopStyle:after": "none", "borderRightStyle:after": "none", "borderBottomStyle:after": "none", "borderLeftStyle:after": "none", "borderTopColor:after": "#000000", "borderRightColor:after": "#000000", "borderBottomColor:after": "#000000", "borderLeftColor:after": "#000000", "paddingTop:after": 0, "paddingRight:after": 0, "paddingBottom:after": 0, "paddingLeft:after": 0 } }, "btn-1": { ".footer ": { "backgroundImage": "none", "backgroundColor": "#F3F3FB", "color": "#747491" } }, "btn-2": { ".footer ": { "backgroundImage": "none", "backgroundColor": "#4F46E5", "color": "#FFFFFF" } } };
  const customModal = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["styles", [_style_0$c]]]);
  function chapterAllQuestionsTreeByCategoryId(options) {
    return __awaiter(this, void 0, void 0, function* () {
      const res = yield http.get("/japi/al/v3/userChapterExercise/chapterAllQuestionsTreeByCategoryId", options);
      return respDataAsArray(res);
    });
  }
  function getAllQuestionTypeByChapter(options) {
    return __awaiter(this, void 0, void 0, function* () {
      let res = yield http.post("/japi/al/v3/userChapterExercise/getAllQuestionTypeByChapter", options);
      return respDataAsArray(res);
    });
  }
  function getCostomQuestionList(options, extendOptions, callback) {
    let exopt = new UTSJSONObject({});
    for (let key in extendOptions) {
      let item = extendOptions[key];
      if (UTS.isInstanceOf(item, Array)) {
        if (item.indexOf("all") == -1) {
          exopt[key] = item.join(",");
        }
      } else {
        exopt[key] = item;
      }
    }
    let data = new UTSJSONObject(Object.assign(Object.assign({}, options), exopt));
    return http.post("/japi/al/v3/userChapterExercise/filterChapterExerciseQuestionIdsByCustom", data).then((res = null) => {
      let list = respDataAsArray(res);
      if (list.length == 0) {
        uni.showToast({
          title: "没有找到相关题目",
          icon: "none"
        });
        return null;
      }
      if (list.length < data.questionCount) {
        uni.showToast({
          title: "当前知识点下，符合要求的试题数量少于您设定的推题量",
          icon: "none"
        });
      }
      callback(list.map((v) => {
        return v.toString();
      }).join(","));
    });
  }
  class EntryState extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            isShowSpecial: { type: Boolean, optional: false },
            isShowQa: { type: Boolean, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = EntryState.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.isShowSpecial = this.__props__.isShowSpecial;
      this.isShowQa = this.__props__.isShowQa;
      delete this.__props__;
    }
  }
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      new UTSJSONObject({});
      const modeList = [
        new UTSJSONObject({
          name: "精选题集",
          val: 1
        }),
        new UTSJSONObject({
          name: "题海战术",
          val: 2
        })
      ];
      const isLoadingChapter = vue.ref(true);
      const modeValue = vue.ref(1);
      const chapterList = vue.ref([]);
      const actionType = vue.ref(1);
      const qTypeList = vue.ref([]);
      let qids = [];
      const realList = vue.ref([]);
      const realListIsLoading = vue.ref(true);
      const isShowCustomModal = vue.ref(false);
      const mockList = vue.ref([]);
      const mockIsLoading = vue.ref(true);
      const homeworkInfo = vue.reactive(new UTSJSONObject({
        totalQuestionNum: 0,
        completeQuestionNum: 0
      }));
      const errorList = vue.ref([]);
      const entryState = vue.reactive(new EntryState({
        isShowSpecial: false,
        isShowQa: false
      }));
      const qTabList = ["历年真题", "模考精测"];
      const qActiveIndex = vue.ref(0);
      const commonOptions = () => {
        return new UTSJSONObject({
          categoryId: state$1.activeCategory.categoryId,
          productId: state$1.activeCategory.productId,
          goodsId: state$1.goodsId
        });
      };
      function getChapterList() {
        let data = new UTSJSONObject(Object.assign(Object.assign({}, commonOptions()), { searchQuestionModel: modeValue.value }));
        isLoadingChapter.value = true;
        chapterAllQuestionsTreeByCategoryId(data).then((list) => {
          chapterList.value = list;
        }).catch((err = null) => {
          uni.__log__("error", "at pages/topic/index.uvue:296", "[topic] chapter list failed", data, err);
          chapterList.value = [];
        }).finally(() => {
          isLoadingChapter.value = false;
        });
      }
      function getQtypeList() {
        let data = new UTSJSONObject(Object.assign(Object.assign({}, commonOptions()), { searchQuestionModel: modeValue.value }));
        if (qids.length > 0) {
          data.questionIdList = qids.map((item) => {
            return item.toString();
          }).join(",");
        }
        getAllQuestionTypeByChapter(data).then((list) => {
          qTypeList.value = list.map((item) => {
            return new UTSJSONObject({
              value: item.code == -1 ? "all" : item.code,
              title: item.desc
            });
          });
        });
      }
      function getStudyMethodHomeworkList() {
        let data = new UTSJSONObject(Object.assign({}, commonOptions()));
        http.get("/japi/al/v7/questionCollection/getStudyMethodHomeworkList", data).then((res = null) => {
          let list = respDataAsArray(res);
          let totalQuestionNum = 0, completeQuestionNum = 0;
          list.forEach((item) => {
            totalQuestionNum += item.totalQuestionNum;
            completeQuestionNum += item.completeQuestionNum;
          });
          homeworkInfo.totalQuestionNum = totalQuestionNum;
          homeworkInfo.completeQuestionNum = completeQuestionNum;
        }).catch((err = null) => {
          uni.__log__("error", "at pages/topic/index.uvue:337", "[topic] homework list failed", data, err);
          homeworkInfo.totalQuestionNum = 0;
          homeworkInfo.completeQuestionNum = 0;
        });
      }
      function getUserErrorQuestionCountByQtype() {
        let data = new UTSJSONObject(Object.assign(Object.assign({}, commonOptions()), { cycleType: 0, sourceType: 0 }));
        http.get("/japi/uc/study/getUserErrorQuestionCountByQtype", data).then((res = null) => {
          let l = respDataAsArray(res);
          let qidArr = [];
          l.forEach((item) => {
            qidArr.push(...item.questionIdList);
          });
          errorList.value = qidArr;
        }).catch((err = null) => {
          uni.__log__("error", "at pages/topic/index.uvue:357", "[topic] error question count failed", data, err);
          errorList.value = [];
        });
      }
      function getRealQusList() {
        let data = new UTSJSONObject(Object.assign(Object.assign({}, commonOptions()), { paperType: 2 }));
        realListIsLoading.value = true;
        http.get("/japi/al/v7/questionCollection/getPaperList", data).then((res = null) => {
          realList.value = respDataAsArray(res);
        }).catch((err = null) => {
          uni.__log__("error", "at pages/topic/index.uvue:372", "[topic] real paper list failed", data, err);
          realList.value = [];
        }).finally(() => {
          realListIsLoading.value = false;
        });
      }
      function getSpecialCategoryList() {
        let data = new UTSJSONObject(Object.assign({}, commonOptions()));
        http.get("/japi/al/v7/questionCollection/specialCategoryList", data).then((res = null) => {
          let list = respDataAsArray(res);
          if (list.length > 0) {
            entryState.isShowSpecial = true;
          } else {
            entryState.isShowSpecial = false;
          }
        }).catch((err = null) => {
          uni.__log__("error", "at pages/topic/index.uvue:392", "[topic] special category list failed", data, err);
          entryState.isShowSpecial = false;
        });
      }
      function aiPhotoQuestionSearchCategoryList() {
        let data = new UTSJSONObject({
          secondCategory: state$1.activeCategory.secondCategoryId
        });
        http.get("/japi/al/assistant/v2/aiPhotoQuestionSearchCategoryList", data).then((res = null) => {
          let l = respDataAsArray(res);
          entryState.isShowQa = false;
          l.forEach((item) => {
            if (item.categoryId == state$1.activeCategory.categoryId) {
              entryState.isShowQa = true;
            }
          });
        }).catch((err = null) => {
          uni.__log__("error", "at pages/topic/index.uvue:410", "[topic] photo question category failed", data, err);
          entryState.isShowQa = false;
        });
      }
      function getMockList() {
        let data = new UTSJSONObject(Object.assign(Object.assign({}, commonOptions()), { paperType: 1 }));
        mockIsLoading.value = true;
        http.get("/japi/al/v7/questionCollection/getAlPaperList", data).then((res = null) => {
          let info = respDataAsObject(res);
          let list = info.list;
          mockList.value = list;
        }).catch((err = null) => {
          uni.__log__("error", "at pages/topic/index.uvue:427", "[topic] mock paper list failed", data, err);
          mockList.value = [];
        }).finally(() => {
          mockIsLoading.value = false;
        });
      }
      const handlerCustomModal = (is) => {
        isShowCustomModal.value = is;
        if (is) {
          getQtypeList();
        }
      };
      const handlerCustom = () => {
        qids = [];
        actionType.value = 2;
        handlerCustomModal(true);
      };
      const handlerToChapter = () => {
        router.push(new RouterOptions({
          url: "/pages/topic/chapter",
          query: new UTSJSONObject({
            categoryId: state$1.activeCategory.categoryId,
            productId: state$1.activeCategory.productId,
            goodsId: state$1.goodsId,
            searchQuestionModel: modeValue.value,
            secondCategoryId: state$1.activeCategory.secondCategoryId,
            secondCategoryName: state$1.activeCategory.secondCategoryName
          })
        }));
      };
      const handlerQTabChange = (index) => {
        qActiveIndex.value = index;
      };
      function init() {
        getChapterList();
        getStudyMethodHomeworkList();
        getUserErrorQuestionCountByQtype();
        getSpecialCategoryList();
        aiPhotoQuestionSearchCategoryList();
        getRealQusList();
        getMockList();
      }
      const handlerModeChange = (item) => {
        let val = item.val;
        if (modeValue.value == val)
          return null;
        modeValue.value = val;
        getChapterList();
      };
      let categoryId = "";
      const handlerCategoryChange = (item) => {
        categoryId = item.categoryId;
        init();
      };
      vue.onLoad((e) => {
        categoryInitState(e).then((activeCategoryInfo) => {
          categoryId = activeCategoryInfo.categoryId;
          init();
        });
      });
      vue.onPageShow(() => {
        if (categoryId != "")
          init();
      });
      function routerCommonOptions() {
        return new UTSJSONObject({
          goodsId: state$1.goodsId,
          productId: state$1.activeCategory.productId,
          categoryId: state$1.activeCategory.categoryId
        });
      }
      const handlerFEQ = (type) => {
        router.app(new RouterOptions({
          url: "app://cspro/frequencyErrorQuestionList",
          query: new UTSJSONObject(Object.assign(Object.assign({}, routerCommonOptions()), { type }))
        }));
      };
      const handlerPaperList = (type) => {
        router.app(new RouterOptions({
          url: "app://cspro/paperList",
          query: new UTSJSONObject(Object.assign(Object.assign({}, routerCommonOptions()), { type }))
        }));
      };
      const handlerError = (isToQuestionSet) => {
        router.app(new RouterOptions({
          url: isToQuestionSet ? "app://cspro/wrongQuestionSet" : "app://cspro/doAllWrongQuestionList",
          query: new UTSJSONObject(Object.assign(Object.assign({}, routerCommonOptions()), { quesitonIdList: errorList.value.map((v) => {
            return v.toString();
          }).join(",") }))
        }));
      };
      const handlerToApp = (url) => {
        router.app(new RouterOptions({
          url,
          query: new UTSJSONObject(Object.assign({}, routerCommonOptions()))
        }));
      };
      const handlerChapter = (item, exOpt) => {
        var _a, _b;
        let qids2 = item.allQuestionIdList.map((v) => {
          return v.toString();
        }).join(",");
        handleAppAction("handleChapterExercise", new UTSJSONObject(Object.assign(Object.assign(Object.assign({}, routerCommonOptions()), {
          // goodsName:'',
          // categoryName:state.activeCategory.categoryAlias ?? state.activeCategory.categoryName,
          secondCategoryId: state$1.activeCategory.secondCategoryId,
          secondCategoryName: state$1.activeCategory.secondCategoryName,
          questionIds: qids2,
          questionSourceMode: modeValue.value,
          chapterId: item.chapterId,
          knowledgeId: (_a = item.knowledgeId) !== null && _a !== void 0 ? _a : "",
          knowledgeName: (_b = item.knowledgeName) !== null && _b !== void 0 ? _b : ""
        }), exOpt)));
      };
      let activeItem = new UTSJSONObject({});
      const handlerStart = (filterQuery) => {
        let data = new UTSJSONObject(Object.assign(Object.assign({}, commonOptions()), { searchQuestionModel: modeValue.value }));
        if (qids.length > 0) {
          data.questionIdList = qids.map((item) => {
            return item.toString();
          }).join(",");
        }
        getCostomQuestionList(data, filterQuery, (ids) => {
          if (actionType.value == 1) {
            handlerChapter(activeItem, new UTSJSONObject({
              isCustomChapter: true,
              openType: 1,
              questionIds: ids
            }));
          } else {
            handleAppAction("handleCustomExercise", new UTSJSONObject(Object.assign(Object.assign({}, routerCommonOptions()), { questionIds: ids, questionSourceMode: modeValue.value, secondCategoryId: state$1.activeCategory.secondCategoryId })));
          }
        });
      };
      const handlerDo = (item, index) => {
        if (item.level == 1) {
          qids = item.allQuestionIdList;
          actionType.value = 1;
          activeItem = item;
          handlerCustomModal(true);
        } else {
          activeItem = new UTSJSONObject({});
          handlerChapter(item, new UTSJSONObject({ openType: 1 }));
        }
      };
      const handlerLook = (item, index) => {
        handlerChapter(item, new UTSJSONObject({ openType: 2 }));
      };
      return (_ctx = null, _cache = null) => {
        const _component_c_navbar = resolveEasycom(vue.resolveDynamicComponent("c-navbar"), __easycom_3);
        const _component_c_category_tab = resolveEasycom(vue.resolveDynamicComponent("c-category-tab"), __easycom_4);
        const _component_c_loading = resolveEasycom(vue.resolveDynamicComponent("c-loading"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          class: "page",
          style: new UTSJSONObject({ "flex": "1" })
        }), [
          vue.createVNode(_component_c_navbar, new UTSJSONObject({
            class: "navbar",
            title: "题集"
          }), {
            ["navbar-right"]: vue.withCtx(() => {
              return [
                vue.createElementVNode("view", new UTSJSONObject({
                  class: "action-item",
                  onClick: _cache[0] || (_cache[0] = ($event = null) => {
                    return handlerToApp("app://cspro/questionCollect");
                  })
                }), [
                  vue.createElementVNode("image", new UTSJSONObject({
                    src: _imports_0$9,
                    class: "ico"
                  })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "收藏夹")
                ]),
                vue.createElementVNode("view", new UTSJSONObject({
                  class: "action-item",
                  onClick: _cache[1] || (_cache[1] = ($event = null) => {
                    return handlerToApp("app://cspro/questionRecordList");
                  })
                }), [
                  vue.createElementVNode("image", new UTSJSONObject({
                    src: _imports_1$7,
                    class: "ico"
                  })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "做题记录")
                ])
              ];
            }),
            _: 2
          }, 1024),
          vue.createElementVNode("view", new UTSJSONObject({ class: "page-center top-section" }), [
            vue.createVNode(_component_c_category_tab, new UTSJSONObject({ onChange: handlerCategoryChange })),
            vue.createElementVNode("view", new UTSJSONObject({ class: "filter-list" }), [
              (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(modeList, (item, index) => {
                return vue.createElementVNode("view", new UTSJSONObject({
                  class: vue.normalizeClass(["item", new UTSJSONObject({ active: item.val == vue.unref(modeValue) })]),
                  key: item.val,
                  onClick: ($event = null) => {
                    return handlerModeChange(item);
                  }
                }), [
                  vue.createElementVNode("text", new UTSJSONObject({
                    class: vue.normalizeClass(["text", new UTSJSONObject({ "active-text": item.val == vue.unref(modeValue) })])
                  }), vue.toDisplayString(item.name), 3)
                ], 10, ["onClick"]);
              }), 64))
            ])
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "page-center main" }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "chapter wrap" }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "wrap-header" }), [
                vue.createElementVNode("text", new UTSJSONObject({ class: "title-text" }), "章节练习"),
                vue.createElementVNode("text", new UTSJSONObject({
                  class: "more-text",
                  onClick: handlerToChapter
                }), "更多")
              ]),
              vue.createElementVNode("scroll-view", new UTSJSONObject({
                class: "box",
                style: new UTSJSONObject({ "flex": "1" }),
                "show-scrollbar": false
              }), [
                vue.unref(isLoadingChapter) ? (vue.openBlock(), vue.createBlock(_component_c_loading, new UTSJSONObject({ key: 0 }))) : vue.createCommentVNode("", true),
                vue.createVNode(vue.unref(chapterTree), new UTSJSONObject({
                  list: vue.unref(chapterList),
                  onLook: handlerLook,
                  onDo: handlerDo
                }), null, 8, ["list"])
              ])
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "composite" }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "row" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "cell" }), [
                  vue.createElementVNode("view", new UTSJSONObject({
                    class: "card",
                    onClick: _cache[2] || (_cache[2] = ($event = null) => {
                      return handlerToApp("app://cspro/homeworkList");
                    })
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "card-top" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "title-text" }), "课后作业")
                    ]),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "card-content" }), [
                      vue.createElementVNode("image", new UTSJSONObject({
                        class: "ico",
                        src: _imports_2$3
                      })),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "info" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "name" }), "检验学习成果"),
                        vue.createElementVNode("view", new UTSJSONObject({ class: "desc" }), [
                          vue.createElementVNode("text", new UTSJSONObject({ class: "n" }), vue.toDisplayString(vue.unref(homeworkInfo).completeQuestionNum), 1),
                          vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "题已完成/共" + vue.toDisplayString(vue.unref(homeworkInfo).totalQuestionNum) + "题", 1)
                        ])
                      ]),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "btn" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "做作业")
                      ])
                    ])
                  ])
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "cell cell-even" }), [
                  vue.createElementVNode("view", new UTSJSONObject({
                    class: "card",
                    onClick: _cache[4] || (_cache[4] = ($event = null) => {
                      return handlerError(true);
                    })
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "card-top" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "title-text" }), "错题本")
                    ]),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "card-content" }), [
                      vue.createElementVNode("image", new UTSJSONObject({
                        class: "ico",
                        src: _imports_3$2
                      })),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "info" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "name" }), "全部错题"),
                        vue.createElementVNode("view", new UTSJSONObject({ class: "desc" }), [
                          vue.createElementVNode("text", new UTSJSONObject({ class: "n" }), vue.toDisplayString(vue.unref(errorList).length), 1),
                          vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "题")
                        ])
                      ]),
                      vue.createElementVNode("view", new UTSJSONObject({
                        class: "btn",
                        onClick: _cache[3] || (_cache[3] = vue.withModifiers(($event = null) => {
                          return handlerError(false);
                        }, ["stop"]))
                      }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "消灭错题")
                      ])
                    ])
                  ])
                ])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({ class: "row" }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "cell" }), [
                  vue.createElementVNode("view", new UTSJSONObject({
                    class: "card",
                    onClick: handlerCustom
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "card-top" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "title-text" }), "自定义刷题")
                    ]),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "card-content" }), [
                      vue.createElementVNode("image", new UTSJSONObject({
                        class: "ico",
                        src: _imports_4$1
                      })),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "info" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "name" }), "自定义筛选项组合练习")
                      ])
                    ])
                  ])
                ]),
                vue.createElementVNode("view", new UTSJSONObject({
                  class: "cell cell-even row",
                  style: new UTSJSONObject({ "margin-bottom": "0rpx" })
                }), [
                  vue.unref(entryState).isShowSpecial ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    key: 0,
                    class: vue.normalizeClass(["cell", new UTSJSONObject({ "cell-even": !vue.unref(entryState).isShowQa })]),
                    onClick: _cache[5] || (_cache[5] = ($event = null) => {
                      return handlerToApp("app://cspro/specialList");
                    })
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["card", new UTSJSONObject({ "small-card": vue.unref(entryState).isShowSpecial && vue.unref(entryState).isShowQa })])
                    }), [
                      vue.createElementVNode("view", new UTSJSONObject({ class: "card-top" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "title-text" }), "专项练习")
                      ]),
                      vue.createElementVNode("image", new UTSJSONObject({
                        class: "ico",
                        src: _imports_5$1
                      }))
                    ], 2)
                  ], 2)) : vue.createCommentVNode("", true),
                  vue.unref(entryState).isShowQa ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    key: 1,
                    class: "cell cell-even",
                    onClick: _cache[6] || (_cache[6] = ($event = null) => {
                      return handlerToApp("app://cspro/photoSearch");
                    })
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: vue.normalizeClass(["card", new UTSJSONObject({ "small-card": vue.unref(entryState).isShowSpecial && vue.unref(entryState).isShowQa })])
                    }), [
                      vue.createElementVNode("view", new UTSJSONObject({ class: "card-top" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "title-text" }), "拍题答疑")
                      ]),
                      vue.createElementVNode("image", new UTSJSONObject({
                        class: "ico",
                        src: _imports_6$1
                      }))
                    ], 2)
                  ])) : vue.createCommentVNode("", true)
                ])
              ]),
              vue.createElementVNode("view", new UTSJSONObject({
                class: "row",
                style: new UTSJSONObject({ "flex": "1" })
              }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "cell wrap" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "wrap-header" }), [
                    vue.createElementVNode("text", new UTSJSONObject({ class: "title-text" }), "高频易错")
                  ]),
                  vue.createElementVNode("scroll-view", new UTSJSONObject({
                    class: "box high-fre-error-list",
                    style: new UTSJSONObject({ "flex": "1" }),
                    "show-scrollbar": false
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: "item",
                      onClick: _cache[7] || (_cache[7] = ($event = null) => {
                        return handlerFEQ(1);
                      })
                    }), [
                      vue.createElementVNode("image", new UTSJSONObject({
                        class: "ico",
                        src: _imports_7$1,
                        mode: "heightFix"
                      })),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "info" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "name" }), "周易错题"),
                        vue.createElementVNode("view", new UTSJSONObject({ class: "desc" }), [
                          vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "大数据精选错误率最高的前 50题")
                        ])
                      ])
                    ]),
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: "item",
                      onClick: _cache[8] || (_cache[8] = ($event = null) => {
                        return handlerFEQ(2);
                      })
                    }), [
                      vue.createElementVNode("image", new UTSJSONObject({
                        class: "ico",
                        src: _imports_8$1,
                        mode: "heightFix"
                      })),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "info" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "name" }), "月易错题"),
                        vue.createElementVNode("view", new UTSJSONObject({ class: "desc" }), [
                          vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "大数据精选错误率最高的前 100题")
                        ])
                      ])
                    ]),
                    vue.createElementVNode("view", new UTSJSONObject({
                      class: "item",
                      onClick: _cache[9] || (_cache[9] = ($event = null) => {
                        return handlerFEQ(3);
                      })
                    }), [
                      vue.createElementVNode("image", new UTSJSONObject({
                        class: "ico",
                        src: _imports_9,
                        mode: "heightFix"
                      })),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "info" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "name" }), "年度易错题"),
                        vue.createElementVNode("view", new UTSJSONObject({ class: "desc" }), [
                          vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "全站错误率最高的前20%题目"),
                          vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "深度巩固顽固错题点")
                        ])
                      ])
                    ])
                  ])
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "cell cell-even wrap" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "wrap-header" }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "real-ques-tab-list" }), [
                      (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(qTabList, (item, index) => {
                        return vue.createElementVNode("text", new UTSJSONObject({
                          class: vue.normalizeClass(["item", new UTSJSONObject({ active: vue.unref(qActiveIndex) == index })]),
                          key: index,
                          onClick: ($event = null) => {
                            return handlerQTabChange(index);
                          }
                        }), vue.toDisplayString(item), 11, ["onClick"]);
                      }), 64))
                    ]),
                    vue.createElementVNode("text", new UTSJSONObject({
                      class: "more-text",
                      onClick: _cache[10] || (_cache[10] = ($event = null) => {
                        return handlerPaperList(vue.unref(qActiveIndex) == 0 ? 2 : 3);
                      })
                    }), "更多")
                  ]),
                  vue.createElementVNode("scroll-view", new UTSJSONObject({
                    class: "box",
                    style: new UTSJSONObject({ "flex": "1" }),
                    "show-scrollbar": false
                  }), [
                    vue.unref(qActiveIndex) == 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                      key: 0,
                      class: "real-ques-list",
                      onClick: _cache[11] || (_cache[11] = ($event = null) => {
                        return handlerPaperList(2);
                      })
                    }), [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(realList), (item, index) => {
                        var _a, _b;
                        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                          class: "item",
                          key: index
                        }), [
                          vue.createElementVNode("image", new UTSJSONObject({
                            class: "ico",
                            src: _imports_10,
                            mode: "heightFix"
                          })),
                          vue.createElementVNode("view", new UTSJSONObject({ class: "info" }), [
                            vue.createElementVNode("text", new UTSJSONObject({ class: "name" }), vue.toDisplayString(item.paperName), 1),
                            vue.createElementVNode("view", new UTSJSONObject({ class: "desc" }), [
                              vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString((_a = item.joinNum) !== null && _a !== void 0 ? _a : 0) + "人做过", 1),
                              item.answerId != null ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                                key: 0,
                                class: "t"
                              }), "上次得分 " + vue.toDisplayString((_b = item.score) !== null && _b !== void 0 ? _b : 0) + "分", 1)) : (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                                key: 1,
                                class: "t"
                              }), "未作答"))
                            ])
                          ])
                        ]);
                      }), 128)),
                      vue.unref(realList).length == 0 && !vue.unref(realListIsLoading) ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                        key: 0,
                        class: "empty-box"
                      }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "暂无内容")
                      ])) : vue.createCommentVNode("", true)
                    ])) : vue.createCommentVNode("", true),
                    vue.unref(qActiveIndex) == 1 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                      key: 1,
                      class: "mock-ques-list"
                    }), [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(mockList), (item, index) => {
                        var _a, _b;
                        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                          class: "item",
                          key: index,
                          onClick: _cache[12] || (_cache[12] = ($event = null) => {
                            return handlerPaperList(3);
                          })
                        }), [
                          vue.createElementVNode("text", new UTSJSONObject({ class: "name" }), vue.toDisplayString(item.paperName), 1),
                          vue.createElementVNode("view", new UTSJSONObject({ class: "desc" }), [
                            vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "已完成 " + vue.toDisplayString((_a = item.submitCount) !== null && _a !== void 0 ? _a : 0) + "/" + vue.toDisplayString((_b = item.totalCount) !== null && _b !== void 0 ? _b : 0), 1),
                            item.submitCount != 0 && item.submitCount != null ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                              key: 0,
                              class: "t"
                            }), " 正确率 " + vue.toDisplayString(item.rightRate), 1)) : vue.createCommentVNode("", true)
                          ])
                        ]);
                      }), 128)),
                      vue.unref(mockList).length == 0 && !vue.unref(mockIsLoading) ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                        key: 0,
                        class: "empty-box"
                      }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "暂无内容")
                      ])) : vue.createCommentVNode("", true)
                    ])) : vue.createCommentVNode("", true)
                  ])
                ])
              ])
            ])
          ]),
          vue.withDirectives(vue.createVNode(vue.unref(customModal), new UTSJSONObject({
            title: vue.unref(actionType) == 1 ? "请选择题目" : "自定义刷题",
            qTypeList: vue.unref(qTypeList),
            onClose: _cache[13] || (_cache[13] = ($event = null) => {
              return handlerCustomModal(false);
            }),
            onConfirm: handlerStart
          }), null, 8, ["title", "qTypeList"]), [
            [vue.vShow, vue.unref(isShowCustomModal)]
          ])
        ]);
      };
    }
  });
  const _style_0$b = { "page": { "": { "backgroundImage": "linear-gradient(to bottom, #DBDDFF, #fff)", "backgroundColor": "rgba(0,0,0,0)" } }, "page-center": { "": { "paddingTop": 0, "paddingRight": "23rpx", "paddingBottom": 0, "paddingLeft": "23rpx" } }, "action-item": { ".navbar ": { "marginLeft": "12rpx", "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "ico": { ".navbar .action-item ": { "width": "12rpx", "height": "12rpx", "marginRight": "2rpx" }, ".card ": { "width": "25rpx", "height": "25rpx", "marginRight": "8.3rpx" }, ".high-fre-error-list ": { "height": "52rpx", "marginRight": "1.5rpx" }, ".real-ques-list ": { "height": "25rpx", "marginRight": "8.3rpx" } }, "text": { ".navbar .action-item ": { "fontSize": "8rpx", "color": "#4F46E5", "lineHeight": "10rpx" }, ".top-section .filter-list ": { "fontSize": "8rpx", "color": "#6B6C87", "lineHeight": "9rpx" }, ".card .btn ": { "textAlign": "center", "fontSize": "9rpx", "color": "#4F46E5", "lineHeight": "21rpx" }, ".empty-box ": { "fontSize": "8rpx", "color": "#8F8FA6", "lineHeight": "17rpx", "textAlign": "center" } }, "top-section": { "": { "height": "21rpx", "marginBottom": "10rpx", "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" } }, "filter-list": { ".top-section ": { "display": "flex", "flexDirection": "row", "backgroundImage": "linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.5))", "backgroundColor": "rgba(0,0,0,0)", "borderTopLeftRadius": "11rpx", "borderTopRightRadius": "11rpx", "borderBottomRightRadius": "11rpx", "borderBottomLeftRadius": "11rpx", "paddingTop": "2.6rpx", "paddingRight": "3rpx", "paddingBottom": "2.6rpx", "paddingLeft": "3rpx" } }, "item": { ".top-section .filter-list ": { "width": "50rpx", "height": "16rpx", "borderTopLeftRadius": "8rpx", "borderTopRightRadius": "8rpx", "borderBottomRightRadius": "8rpx", "borderBottomLeftRadius": "8rpx", "display": "flex", "justifyContent": "center", "alignItems": "center" }, ".top-section .filter-list .active": { "backgroundColor": "#FFFFFF" }, ".high-fre-error-list ": { "height": "52rpx", "backgroundImage": "none", "backgroundColor": "#FFFFFF", "borderTopLeftRadius": "7rpx", "borderTopRightRadius": "7rpx", "borderBottomRightRadius": "7rpx", "borderBottomLeftRadius": "7rpx", "marginBottom": "6.25rpx", "display": "flex", "flexDirection": "row" }, ".real-ques-tab-list ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#747491", "lineHeight": "17rpx", "marginRight": "15rpx" }, ".real-ques-list ": { "backgroundImage": "none", "backgroundColor": "#FFFFFF", "borderTopLeftRadius": "7rpx", "borderTopRightRadius": "7rpx", "borderBottomRightRadius": "7rpx", "borderBottomLeftRadius": "7rpx", "marginBottom": "6.25rpx", "display": "flex", "flexDirection": "row", "alignItems": "center", "paddingTop": "10rpx", "paddingRight": 15.5, "paddingBottom": "10rpx", "paddingLeft": 15.5 }, ".mock-ques-list ": { "height": "52rpx", "backgroundImage": "none", "backgroundColor": "#FFFFFF", "borderTopLeftRadius": "7rpx", "borderTopRightRadius": "7rpx", "borderBottomRightRadius": "7rpx", "borderBottomLeftRadius": "7rpx", "marginBottom": "6.25rpx", "justifyContent": "center", "paddingTop": 0, "paddingRight": "12.5rpx", "paddingBottom": 0, "paddingLeft": "12.5rpx" } }, "active-text": { ".top-section .filter-list ": { "color": "#6963EA" } }, "main": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "flexDirection": "row" } }, "chapter": { "": { "width": "227rpx", "marginRight": "12rpx" } }, "box": { ".chapter ": { "backgroundImage": "none", "backgroundColor": "#FFFFFF", "borderTopLeftRadius": "6rpx", "borderTopRightRadius": "6rpx", "borderBottomRightRadius": "6rpx", "borderBottomLeftRadius": "6rpx", "paddingTop": "12.5rpx", "paddingRight": "11.5rpx", "paddingBottom": 0, "paddingLeft": "11.5rpx" }, ".wrap ": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } }, "title-text": { "": { "fontWeight": "700", "fontSize": "12rpx", "color": "#1B1B48", "lineHeight": "17rpx" } }, "more-text": { "": { "fontSize": "8rpx", "color": "#4F46E5", "lineHeight": "10rpx" } }, "wrap": { "": { "paddingTop": "12rpx", "paddingRight": "12rpx", "paddingBottom": 0, "paddingLeft": "12rpx", "borderTopLeftRadius": "10rpx", "borderTopRightRadius": "10rpx", "borderBottomRightRadius": "10rpx", "borderBottomLeftRadius": "10rpx", "backgroundImage": "linear-gradient(to bottom, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.5))", "backgroundColor": "rgba(0,0,0,0)" } }, "wrap-header": { "": { "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "8rpx" } }, "composite": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } }, "row": { "": { "display": "flex", "flexDirection": "row", "marginBottom": "12rpx" } }, "cell": { ".row ": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "marginRight": "11rpx" } }, "cell-even": { ".row ": { "marginRight": 0 } }, "card": { "": { "backgroundImage": "linear-gradient(180deg, rgba(255, 255, 255, 0.64), rgba(255, 255, 255, 0.5))", "backgroundColor": "rgba(0,0,0,0)", "borderTopLeftRadius": "10rpx", "borderTopRightRadius": "10rpx", "borderBottomRightRadius": "10rpx", "borderBottomLeftRadius": "10rpx", "paddingTop": "13rpx", "paddingRight": "12.5rpx", "paddingBottom": "13rpx", "paddingLeft": "12.5rpx" } }, "card-top": { ".card ": { "marginBottom": "10rpx" } }, "card-content": { ".card ": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "info": { ".card ": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" }, ".high-fre-error-list ": { "paddingTop": "11.46rpx" }, ".real-ques-list ": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } }, "name": { ".card ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#1B1B48", "lineHeight": "13rpx" }, ".high-fre-error-list ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#1B1B48", "lineHeight": "13rpx", "marginBottom": "3.1rpx" }, ".real-ques-list ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#1B1B48", "lineHeight": "13rpx", "marginBottom": "3rpx" }, ".mock-ques-list ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#1B1B48", "lineHeight": "13rpx", "marginBottom": "5.73rpx", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" } }, "desc": { ".card ": { "paddingTop": "5.2rpx", "display": "flex", "flexDirection": "row", "alignItems": "flex-end" }, ".real-ques-list ": { "display": "flex", "flexDirection": "row" }, ".mock-ques-list ": { "display": "flex", "flexDirection": "row" } }, "n": { ".card .desc ": { "fontSize": "13rpx", "color": "#1B1B48", "lineHeight": "14rpx", "whiteSpace": "nowrap" } }, "t": { ".card .desc ": { "fontSize": "8rpx", "color": "#747491", "lineHeight": "10rpx" }, ".high-fre-error-list .desc ": { "fontSize": "8rpx", "color": "#747491", "lineHeight": "10rpx" }, ".real-ques-list .desc ": { "fontSize": "8rpx", "color": "#8F8FA6", "lineHeight": "9rpx", "marginRight": "7.2rpx" }, ".mock-ques-list ": { "fontSize": "8rpx", "color": "#747491", "lineHeight": "10rpx", "marginRight": "4rpx" } }, "btn": { ".card ": { "width": "53rpx", "height": "21rpx", "backgroundColor": "rgba(120,92,255,0.12)", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "4rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": "4rpx" } }, "small-card": { "": { "alignItems": "center" } }, "real-ques-tab-list": { "": { "display": "flex", "flexDirection": "row", "alignItems": "flex-end" } }, "active": { ".real-ques-tab-list ": { "fontSize": "12rpx", "color": "#1B1B48" } }, "empty-box": { "": { "paddingTop": "40rpx" } } };
  const PagesTopicIndex = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["styles", [_style_0$b]]]);
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "chapter",
    setup(__props) {
      let options = new UTSJSONObject({});
      const isLoading = vue.ref(true);
      const isShowCustomModal = vue.ref(false);
      const actionType = vue.ref(1);
      const chapterList = vue.ref([]);
      const qTypeList = vue.ref([]);
      let qids = [];
      function getQtypeList() {
        let data = new UTSJSONObject(Object.assign({}, options));
        if (qids.length > 0) {
          data.questionIdList = qids.map((item) => {
            return item.toString();
          }).join(",");
        }
        getAllQuestionTypeByChapter(data).then((list) => {
          qTypeList.value = list.map((item) => {
            return new UTSJSONObject({
              value: item.code == -1 ? "all" : item.code,
              title: item.desc
            });
          });
        });
      }
      const handlerModal = (is) => {
        isShowCustomModal.value = is;
        if (is) {
          getQtypeList();
        }
      };
      const handlerCustom = () => {
        qids = [];
        actionType.value = 2;
        handlerModal(true);
      };
      const handlerChapter = (item, exOpt) => {
        var _a, _b;
        let qids2 = item.allQuestionIdList.map((v) => {
          return v.toString();
        }).join(",");
        handleAppAction("handleChapterExercise", new UTSJSONObject(Object.assign(Object.assign(Object.assign({}, options), { questionIds: qids2, questionSourceMode: options.searchQuestionModel, chapterId: item.chapterId, knowledgeId: (_a = item.knowledgeId) !== null && _a !== void 0 ? _a : "", knowledgeName: (_b = item.knowledgeName) !== null && _b !== void 0 ? _b : "" }), exOpt)));
      };
      let activeItem = new UTSJSONObject({});
      const handlerDo = (item, index) => {
        if (item.level == 1) {
          qids = item.allQuestionIdList;
          actionType.value = 1;
          activeItem = item;
          handlerModal(true);
        } else {
          activeItem = new UTSJSONObject({});
          handlerChapter(item, new UTSJSONObject({ openType: 1 }));
        }
      };
      const handlerLook = (item, index) => {
        handlerChapter(item, new UTSJSONObject({ openType: 1 }));
      };
      const handlerStart = (filterQuery) => {
        let data = new UTSJSONObject(Object.assign({}, options));
        if (qids.length > 0) {
          data.questionIdList = qids.map((item) => {
            return item.toString();
          }).join(",");
        }
        getCostomQuestionList(data, filterQuery, (ids) => {
          if (actionType.value == 1) {
            handlerChapter(activeItem, new UTSJSONObject({
              isCustomChapter: true,
              openType: 1,
              questionIds: ids
            }));
          } else {
            handleAppAction("handleCustomExercise", new UTSJSONObject(Object.assign(Object.assign({}, options), { questionIds: ids, questionSourceMode: options.searchQuestionModel, secondCategoryId: options.secondCategoryId })));
          }
        });
      };
      vue.onLoad((e) => {
        options = e;
        isLoading.value = true;
        chapterAllQuestionsTreeByCategoryId(e).then((list) => {
          chapterList.value = list;
        }).catch((err = null) => {
          uni.__log__("error", "at pages/topic/chapter.uvue:144", "[topic/chapter] chapter list failed", e, err);
          chapterList.value = [];
        }).finally(() => {
          isLoading.value = false;
        });
      });
      return (_ctx = null, _cache = null) => {
        const _component_c_loading = resolveEasycom(vue.resolveDynamicComponent("c-loading"), __easycom_0$1);
        const _component_c_navbar = resolveEasycom(vue.resolveDynamicComponent("c-navbar"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "page" }), [
          vue.unref(isLoading) ? (vue.openBlock(), vue.createBlock(_component_c_loading, new UTSJSONObject({ key: 0 }))) : vue.createCommentVNode("", true),
          vue.createVNode(_component_c_navbar, new UTSJSONObject({
            class: "navbar",
            title: "章节练习"
          })),
          vue.createElementVNode("scroll-view", new UTSJSONObject({
            class: "container page-center",
            style: new UTSJSONObject({ "flex": "1" }),
            "show-scrollbar": false
          }), [
            vue.createVNode(vue.unref(chapterTree), new UTSJSONObject({
              class: "chapter-tree",
              list: vue.unref(chapterList),
              isShowRight: true,
              onLook: handlerLook,
              onDo: handlerDo
            }), null, 8, ["list"])
          ]),
          vue.createElementVNode("view", new UTSJSONObject({
            class: "custom-btn",
            onClick: handlerCustom
          }), [
            vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "自定义刷题")
          ]),
          vue.withDirectives(vue.createVNode(vue.unref(customModal), new UTSJSONObject({
            title: vue.unref(actionType) == 1 ? "请选择题目" : "自定义刷题",
            qTypeList: vue.unref(qTypeList),
            onClose: _cache[0] || (_cache[0] = ($event = null) => {
              return handlerModal(false);
            }),
            onConfirm: handlerStart
          }), null, 8, ["title", "qTypeList"]), [
            [vue.vShow, vue.unref(isShowCustomModal)]
          ])
        ]);
      };
    }
  });
  const _style_0$a = { "page": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } }, "page-center": { "": { "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx" } }, "chapter-tree": { "": { "paddingBottom": "40rpx" } }, "custom-btn": { "": { "width": "97rpx", "height": "25rpx", "backgroundImage": "none", "backgroundColor": "#4F46E5", "borderTopLeftRadius": "14rpx", "borderTopRightRadius": "14rpx", "borderBottomRightRadius": "14rpx", "borderBottomLeftRadius": "14rpx", "display": "flex", "justifyContent": "center", "alignItems": "center", "position": "fixed", "left": "50%", "bottom": "22rpx", "transform": "translateX(-50%)", "zIndex": 1, "boxShadow": "0rpx 5rpx 6rpx rgba(90, 130, 255, 0.6)" } }, "text": { ".custom-btn ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#FFFFFF", "lineHeight": "13rpx" } } };
  const PagesTopicChapter = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["styles", [_style_0$a]]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "c-scroll-loading-tips",
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      loadend: {
        type: Boolean,
        default: false
      }
    },
    setup(__props) {
      return (_ctx = null, _cache = null) => {
        return __props.loading || __props.loadend ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          key: 0,
          class: "loading-text"
        }), [
          __props.loading ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
            key: 0,
            class: "t"
          }), "加载中...")) : vue.createCommentVNode("", true),
          __props.loadend ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
            key: 1,
            class: "t"
          }), "-我也是有底线的-")) : vue.createCommentVNode("", true)
        ])) : vue.createCommentVNode("", true);
      };
    }
  });
  const _style_0$9 = { "loading-text": { "": { "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0 } }, "t": { ".loading-text ": { "fontSize": "8rpx", "textAlign": "center", "color": "#666666" } } };
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["styles", [_style_0$9]]]);
  const _imports_0$6 = "/static/images/ico-edit.png";
  const _imports_1$4 = "/static/images/ico-delete.png";
  const _imports_2$1 = "/static/images/ico-arrow.png";
  const qtypeMap = new UTSJSONObject({
    "0": "单项选择题",
    "1": "多项选择题",
    "2": "不定向选择题",
    "3": "判断题",
    "4": "填空题",
    "5": "简答题",
    "6": "案例分析题",
    "7": "论述题"
  });
  let PageInfo$1 = class PageInfo2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            pageIndex: { type: Number, optional: false },
            pageSize: { type: Number, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = PageInfo2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.pageIndex = this.__props__.pageIndex;
      this.pageSize = this.__props__.pageSize;
      delete this.__props__;
    }
  };
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const tabList = [
        new UTSJSONObject({ name: "课程" }),
        new UTSJSONObject({ name: "题目" })
      ];
      const activeIndex = vue.ref(0);
      const tabChange = (item, index) => {
        activeIndex.value = index;
      };
      const isLoading1 = vue.ref(true);
      const isLoading2 = vue.ref(true);
      const pageInfo1 = new PageInfo$1({
        pageIndex: 1,
        pageSize: 1e3
      });
      const pageInfo2 = new PageInfo$1({
        pageIndex: 1,
        pageSize: 10
      });
      const isMore1 = vue.ref(true);
      const isMore2 = vue.ref(true);
      const list1 = vue.ref([]);
      const list2 = vue.ref([]);
      const questions = vue.ref(new UTSJSONObject({}));
      function getQuestionList(qids) {
        let data = new UTSJSONObject({
          productId: state$1.activeCategory.productId,
          questionIds: qids
        });
        uni.__log__("log", "at pages/note/index.uvue:147", qids);
        http.get("/japi/homework/getQuestionList", data).then((res = null) => {
          let list = respDataAsArray(res);
          list.forEach((item) => {
            questions.value[item.id.toString()] = item;
          });
        });
      }
      function getList1() {
        let data = new UTSJSONObject({
          categoryId: state$1.activeCategory.categoryId,
          goodsId: state$1.goodsId,
          // from: pageInfo1.pageSize * (pageInfo1.pageIndex - 1),
          // count: pageInfo1.pageSize,
          // rows: pageInfo1.pageSize,
          isAl: state$1.isAl
        });
        isLoading1.value = true;
        http.get("/japi/uc/user-video-note/queryVideoAndWriteNoteList", data).then((res = null) => {
          var _a;
          isLoading1.value = false;
          let info = respDataAsObject(res);
          let list = info.dataList;
          let total = (_a = info === null || info === void 0 ? null : info.total) !== null && _a !== void 0 ? _a : 0;
          list = list.map((v) => {
            var _a2;
            let item = new UTSJSONObject(Object.assign({}, v));
            if (item.noteInfo != null) {
              item = UTSJSONObject.assign(item, item.noteInfo);
            }
            let text = (_a2 = item === null || item === void 0 ? null : item.text) !== null && _a2 !== void 0 ? _a2 : "";
            item.text = text.replace(/<img[^>]*>/g, "");
            item.text = richTextAddInlineStyles(item.text, new UTSJSONObject({
              p: "font-size: 12px;color: #1F2937;line-height: 1.8;",
              li: "font-size: 12px;color: #1F2937;line-height: 1.8;",
              h1: "font-weight: 500;font-size: 12px;color: #1F2937;line-height: 1.6;",
              h2: "font-weight: 500;font-size: 12px;color: #1F2937;line-height: 1.6;",
              h3: "font-weight: 500;font-size: 12px;color: #1F2937;line-height: 1.6;"
            }));
            if (item.updateDate != null) {
              item.updateTime = item.updateDate;
            }
            item.date = timeFormat(item.updateTime, "yyyy-mm-dd hh:MM");
            return item;
          });
          if (pageInfo1.pageIndex == 1) {
            list1.value = list;
          } else {
            list1.value.push(...list);
          }
          if (list1.value.length >= total) {
            isMore1.value = false;
          }
        });
      }
      function getList2() {
        let data = new UTSJSONObject({
          categoryId: state$1.activeCategory.categoryId,
          goodsId: state$1.goodsId,
          from: pageInfo2.pageSize * (pageInfo2.pageIndex - 1),
          count: pageInfo2.pageSize,
          rows: pageInfo2.pageSize,
          isAl: state$1.isAl
        });
        isLoading2.value = true;
        http.get("/japi/uc/user-question-note/queryCategoryNoteList", data).then((res = null) => {
          var _a;
          isLoading2.value = false;
          let info = respDataAsObject(res);
          let list = info.dataList;
          let total = (_a = info === null || info === void 0 ? null : info.total) !== null && _a !== void 0 ? _a : 0;
          list.forEach((item) => {
            item.question = new UTSJSONObject({});
            item.date = timeFormat(item.updateTime, "yyyy-mm-dd hh:MM");
          });
          if (pageInfo2.pageIndex == 1) {
            list2.value = list;
          } else {
            list2.value.push(...list);
          }
          if (list2.value.length >= total) {
            isMore2.value = false;
          }
          if (list.length > 0) {
            let qids = list.filter((item) => {
              return item.questionId != null;
            }).map((item) => {
              return item.questionId.toString();
            }).join(",");
            if (qids == "")
              return null;
            getQuestionList(qids);
          }
        });
      }
      function init() {
        pageInfo1.pageIndex = 1;
        pageInfo2.pageIndex = 1;
        isMore1.value = true;
        isMore2.value = true;
        list1.value = [];
        list2.value = [];
        questions.value = new UTSJSONObject({});
        getList1();
        getList2();
      }
      const handlerCategoryChange = (item) => {
        init();
      };
      const scrolltolower = () => {
        if (activeIndex.value == 1) {
          if (!isMore2.value || isLoading2.value)
            return null;
          pageInfo2.pageIndex++;
          getList2();
        }
      };
      const handlerDelete = (item, index) => {
        uni.showModal(new UTSJSONObject({
          title: "提示",
          content: "确认删除笔记吗",
          success: (res) => {
            if (res.confirm) {
              let data = new UTSJSONObject({
                id: item.id
              });
              http.delete("/japi/uc/user-study-note/delete", data).then((res2 = null) => {
                let info = respDataAsType(res2);
                if (info) {
                  uni.showToast({
                    title: "删除成功",
                    icon: "none"
                  });
                  if (activeIndex.value == 0) {
                    list1.value.splice(index, 1);
                  }
                  if (activeIndex.value == 1) {
                    list2.value.splice(index, 1);
                  }
                }
              });
            }
          }
        }));
      };
      const handlerLike = (item) => {
        let action = "ACTION_UP";
        if (item.hasThumbUp == 1) {
          action = "ACTION_CANCEL";
        }
        let data = new UTSJSONObject({
          id: item.id,
          action,
          isAl: state$1.isAl
        });
        http.get("/japi/uc/user-study-note/thumbUp", data).then((res = null) => {
          if (item.hasThumbUp == 1) {
            item.hasThumbUp = 0;
            item.thumbUpCount = item.thumbUpCount - 1;
          } else {
            item.hasThumbUp = 1;
            item.thumbUpCount = item.thumbUpCount + 1;
          }
        });
      };
      const handlerVdo = (item, actionType) => {
        var _a, _b, _c, _d;
        if (item.commentVideoType == 0)
          return null;
        let query = new UTSJSONObject({
          goodsId: state$1.goodsId,
          categoryId: state$1.activeCategory.categoryId,
          productId: (_a = item.productId) !== null && _a !== void 0 ? _a : "",
          videoResId: (_b = item.videoResId) !== null && _b !== void 0 ? _b : item.resourceId,
          lessonId: (_c = item.lessonId) !== null && _c !== void 0 ? _c : item.objId,
          lessonName: item.lessonName,
          teacherId: (_d = item.teacherId) !== null && _d !== void 0 ? _d : ""
        });
        if (item.source != null) {
          query.source = item.source;
        }
        if (item.objType != null) {
          query.objType = item.objType;
        }
        if (actionType == 1) {
          query.toEdit = true;
        }
        handleAppAction("handleCourseNoteItemClick", query);
      };
      const handlerQuestion = (item) => {
        handleAppAction("handleQuestionNoteItemClick", new UTSJSONObject({
          goodsId: state$1.goodsId,
          categoryId: state$1.activeCategory.categoryId,
          questionIds: item.questionId
        }));
      };
      vue.onLoad((e) => {
        categoryInitState(e).then((activeCategoryInfo) => {
          init();
        });
      });
      return (_ctx = null, _cache = null) => {
        const _component_c_tab = resolveEasycom(vue.resolveDynamicComponent("c-tab"), __easycom_0$2);
        const _component_c_navbar = resolveEasycom(vue.resolveDynamicComponent("c-navbar"), __easycom_3);
        const _component_c_category_tab = resolveEasycom(vue.resolveDynamicComponent("c-category-tab"), __easycom_4);
        const _component_c_loading = resolveEasycom(vue.resolveDynamicComponent("c-loading"), __easycom_0$1);
        const _component_c_scroll_loading_tips = resolveEasycom(vue.resolveDynamicComponent("c-scroll-loading-tips"), __easycom_5);
        const _component_c_empty = resolveEasycom(vue.resolveDynamicComponent("c-empty"), __easycom_6);
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ style: new UTSJSONObject({ "flex": "1" }) }), [
          vue.createVNode(_component_c_navbar, new UTSJSONObject({ class: "navbar" }), {
            default: vue.withCtx(() => {
              return [
                vue.createVNode(_component_c_tab, new UTSJSONObject({
                  list: tabList,
                  onChange: tabChange
                }))
              ];
            }),
            _: 1
          }),
          vue.createElementVNode("view", new UTSJSONObject({ class: "page-center category-section" }), [
            vue.createVNode(_component_c_category_tab, new UTSJSONObject({ onChange: handlerCategoryChange }))
          ]),
          vue.unref(isLoading1) && vue.unref(list1).length == 0 || vue.unref(isLoading2) && vue.unref(list2).length == 0 ? (vue.openBlock(), vue.createBlock(_component_c_loading, new UTSJSONObject({ key: 0 }))) : vue.createCommentVNode("", true),
          vue.createElementVNode("scroll-view", new UTSJSONObject({
            style: new UTSJSONObject({ "flex": "1" }),
            onScrolltolower: scrolltolower
          }), [
            vue.unref(activeIndex) == 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
              key: 0,
              class: "tab-content page-center"
            }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "vdo-list" }), [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(list1), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    class: "item",
                    key: item.id,
                    onClick: ($event = null) => {
                      return handlerVdo(item, 0);
                    }
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "name" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString(item.lessonName), 1)
                    ]),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "content" }), [
                      item.text.indexOf("</") > -1 ? (vue.openBlock(), vue.createElementBlock("rich-text", new UTSJSONObject({
                        key: 0,
                        nodes: item.text
                      }), null, 8, ["nodes"])) : (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                        key: 1,
                        class: "t"
                      }), vue.toDisplayString(item.text), 1))
                    ]),
                    item.thumbOss != null ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                      key: 0,
                      class: "pic pic-thumb",
                      src: item.thumbOss
                    }), null, 8, ["src"])) : vue.createCommentVNode("", true),
                    item.snapshotUrl != null ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                      key: 1,
                      class: "pic",
                      src: item.snapshotUrl
                    }), null, 8, ["src"])) : vue.createCommentVNode("", true),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "down" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "date" }), vue.toDisplayString(item.date), 1),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "action" }), [
                        item.commentVideoType != 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                          key: 0,
                          class: "btn",
                          onClick: vue.withModifiers(($event = null) => {
                            return handlerVdo(item, 1);
                          }, ["stop"])
                        }), [
                          vue.createElementVNode("image", new UTSJSONObject({
                            class: "ico",
                            src: _imports_0$6
                          })),
                          vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "编辑")
                        ], 8, ["onClick"])) : vue.createCommentVNode("", true),
                        vue.createElementVNode("view", new UTSJSONObject({
                          class: "btn",
                          onClick: vue.withModifiers(($event = null) => {
                            return handlerDelete(item, index);
                          }, ["stop"])
                        }), [
                          vue.createElementVNode("image", new UTSJSONObject({
                            class: "ico",
                            src: _imports_1$4
                          })),
                          vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "删除")
                        ], 8, ["onClick"])
                      ])
                    ])
                  ], 8, ["onClick"]);
                }), 128))
              ]),
              vue.createVNode(_component_c_scroll_loading_tips, new UTSJSONObject({
                loading: vue.unref(isLoading1) && vue.unref(list1).length > 0,
                loadend: !vue.unref(isMore1) && !vue.unref(isLoading1) && vue.unref(list1).length > 2
              }), null, 8, ["loading", "loadend"]),
              !vue.unref(isLoading1) && vue.unref(list1).length == 0 ? (vue.openBlock(), vue.createBlock(_component_c_empty, new UTSJSONObject({ key: 0 }), new UTSJSONObject({
                default: vue.withCtx(() => {
                  return [
                    vue.createTextVNode(" 好记性不如烂笔头，快来写下第一条笔记吧～ ")
                  ];
                }),
                _: 1
              }))) : vue.createCommentVNode("", true)
            ])) : vue.createCommentVNode("", true),
            vue.unref(activeIndex) == 1 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
              key: 1,
              class: "tab-content page-center"
            }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "question-list" }), [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(list2), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    class: "item",
                    key: item.id,
                    onClick: ($event = null) => {
                      return handlerQuestion(item);
                    }
                  }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "content" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString(item.text), 1)
                    ]),
                    item.questionId != null && vue.unref(questions)[item.questionId.toString()] != null ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                      key: 0,
                      class: "question-info"
                    }), [
                      vue.createElementVNode("view", new UTSJSONObject({ class: "title" }), [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), " 题目： " + vue.toDisplayString(vue.unref(qtypeMap)[vue.unref(questions)[item.questionId.toString()].qtype.toString()]) + " " + vue.toDisplayString(item.questionTitle), 1)
                      ]),
                      vue.createElementVNode("image", new UTSJSONObject({
                        class: "ico",
                        src: _imports_2$1
                      }))
                    ])) : vue.createCommentVNode("", true),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "down" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "date" }), vue.toDisplayString(item.date), 1),
                      vue.createElementVNode("view", new UTSJSONObject({ class: "action" }), [
                        vue.createElementVNode("view", new UTSJSONObject({
                          class: "btn",
                          onClick: vue.withModifiers(($event = null) => {
                            return handlerLike(item);
                          }, ["stop"])
                        }), [
                          vue.createElementVNode("image", new UTSJSONObject({
                            class: "ico",
                            src: item.hasThumbUp == 1 ? "/static/images/ico-like-active.png" : "/static/images/ico-like.png"
                          }), null, 8, ["src"]),
                          vue.createElementVNode("text", new UTSJSONObject({
                            class: vue.normalizeClass(["t", new UTSJSONObject({ active: item.hasThumbUp == 1 })])
                          }), vue.toDisplayString(item.thumbUpCount <= 0 ? "点赞" : item.thumbUpCount), 3)
                        ], 8, ["onClick"]),
                        vue.createElementVNode("view", new UTSJSONObject({
                          class: "btn",
                          onClick: vue.withModifiers(($event = null) => {
                            return handlerDelete(item, index);
                          }, ["stop"])
                        }), [
                          vue.createElementVNode("image", new UTSJSONObject({
                            class: "ico",
                            src: _imports_1$4
                          })),
                          vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "删除")
                        ], 8, ["onClick"])
                      ])
                    ])
                  ], 8, ["onClick"]);
                }), 128))
              ]),
              vue.createVNode(_component_c_scroll_loading_tips, new UTSJSONObject({
                loading: vue.unref(isLoading2) && vue.unref(list2).length > 0,
                loadend: !vue.unref(isMore2) && !vue.unref(isLoading2) && vue.unref(list2).length > 2
              }), null, 8, ["loading", "loadend"]),
              !vue.unref(isLoading2) && vue.unref(list2).length == 0 ? (vue.openBlock(), vue.createBlock(_component_c_empty, new UTSJSONObject({ key: 0 }), new UTSJSONObject({
                default: vue.withCtx(() => {
                  return [
                    vue.createTextVNode(" 好记性不如烂笔头，快来写下第一条笔记吧～ ")
                  ];
                }),
                _: 1
              }))) : vue.createCommentVNode("", true)
            ])) : vue.createCommentVNode("", true)
          ], 32)
        ]);
      };
    }
  });
  const _style_0$8 = { "category-section": { "": { "marginBottom": "15rpx" } }, "tab-content": { "": { "minHeight": "400rpx" } }, "item": { ".vdo-list ": { "marginBottom": "17.7rpx" }, ".question-list ": { "marginBottom": "17.7rpx" } }, "t": { ".vdo-list .name ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#1F2937", "lineHeight": "15rpx" }, ".vdo-list .content ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#1F2937", "lineHeight": "15rpx" }, ".vdo-list .vdo-position ": { "fontWeight": "700", "fontSize": "8rpx", "color": "#4F46E5", "lineHeight": "10rpx" }, ".question-list .content ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#1F2937", "lineHeight": "15rpx" }, ".question-list .question-info ": { "fontSize": "8rpx", "color": "#00010F", "lineHeight": "10rpx" }, ".down .action ": { "fontSize": "8rpx", "color": "#9499A7", "lineHeight": "10rpx" } }, "content": { ".vdo-list ": { "maxHeight": "44rpx", "marginBottom": "6.25rpx" }, ".question-list ": { "marginBottom": "6.25rpx" } }, "pic": { ".vdo-list ": { "width": "143rpx", "height": "80rpx", "marginBottom": "6.25rpx" } }, "pic-thumb": { ".vdo-list ": { "width": "72rpx", "height": "85rpx", "backgroundImage": "none", "backgroundColor": "#FFFFFF", "borderTopLeftRadius": "6rpx", "borderTopRightRadius": "6rpx", "borderBottomRightRadius": "6rpx", "borderBottomLeftRadius": "6rpx", "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#D8D8D8", "borderRightColor": "#D8D8D8", "borderBottomColor": "#D8D8D8", "borderLeftColor": "#D8D8D8" } }, "row": { ".vdo-list ": { "display": "flex", "flexDirection": "row", "marginBottom": "7.29rpx" } }, "vdo-position": { ".vdo-list ": { "height": "15rpx", "backgroundImage": "none", "backgroundColor": "#EBEAFF", "borderTopLeftRadius": "7rpx", "borderTopRightRadius": "7rpx", "borderBottomRightRadius": "7rpx", "borderBottomLeftRadius": "7rpx", "display": "flex", "flexDirection": "row", "alignItems": "center", "paddingTop": 0, "paddingRight": "6.25rpx", "paddingBottom": 0, "paddingLeft": "6.25rpx" } }, "ico": { ".vdo-list .vdo-position ": { "width": "7.29rpx", "height": "10.42rpx", "marginRight": "3.13rpx" }, ".question-list .question-info ": { "width": "10.42rpx", "height": "10.42rpx", "marginLeft": "16rpx" }, ".down .action ": { "height": "10.42rpx", "width": "10.42rpx", "marginRight": "3.13rpx" } }, "question-info": { ".question-list ": { "paddingTop": "10.94rpx", "paddingRight": "8.33rpx", "paddingBottom": "10.94rpx", "paddingLeft": "8.33rpx", "backgroundImage": "none", "backgroundColor": "rgba(79,70,229,0.05)", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "4rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": "4rpx", "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "6.25rpx" } }, "title": { ".question-list .question-info ": { "flexShrink": 1 } }, "down": { "": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" } }, "date": { ".down ": { "fontSize": "8rpx", "color": "#9499A7", "lineHeight": "10rpx" } }, "action": { ".down ": { "display": "flex", "flexDirection": "row" } }, "btn": { ".down .action ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "marginLeft": "10.42rpx" } }, "active": { ".down .action ": { "color": "#4F46E5" } } };
  const PagesNoteIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["styles", [_style_0$8]]]);
  class State extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            goodsInfo: { type: "Unknown", optional: false }
          };
        }
      };
    }
    constructor(options, metadata = State.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.goodsInfo = this.__props__.goodsInfo;
      delete this.__props__;
    }
  }
  const state = vue.reactive(new State({
    goodsInfo: new UTSJSONObject({})
  }));
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "c-global-state",
    setup(__props) {
      const options = useRoute().query;
      const getGoodsInfo = () => {
        let data = new UTSJSONObject({
          id: options.goodsId
        });
        http.get("/japi/uc/getGoodsById", data).then((res = null) => {
          let info = respDataAsObject(res);
          state.goodsInfo = info;
        });
      };
      vue.onLoad(() => {
        if (state.goodsInfo.id != options.goodsId) {
          getGoodsInfo();
        }
      });
      return () => {
      };
    }
  });
  const _imports_0$5 = "/static/images/ico-checkbox.png";
  const _imports_1$3 = "/static/images/ico-checkbox-active.png";
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "c-checkbox",
    props: {
      modelValue: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, _a) {
      var __emit = _a.emit;
      const props = __props;
      const emit = __emit;
      const change = () => {
        let v = !props.modelValue;
        emit("update:modelValue", v);
        emit("change", v);
      };
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          class: "checkbox",
          onClick: change
        }), [
          !__props.modelValue ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
            key: 0,
            class: "ico",
            src: _imports_0$5
          }))) : (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
            key: 1,
            class: "ico",
            src: _imports_1$3
          }))),
          vue.renderSlot(_ctx.$slots, "default")
        ]);
      };
    }
  });
  const _style_0$7 = { "checkbox": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "ico": { ".checkbox ": { "width": "10.42rpx", "height": "10.42rpx" } } };
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["styles", [_style_0$7]]]);
  const _imports_0$4 = "/static/images/ico-collect.png";
  const _imports_1$2 = "/static/images/ico-view.png";
  const _imports_2 = "/static/images/adopt.png";
  const _imports_3 = "/static/images/avator-ai-teacher.png";
  const _imports_4 = "/static/images/avator-default.png";
  const _imports_5 = "/static/images/ico-collect-active.png";
  const _imports_6 = "/static/images/ico-like.png";
  const _imports_7 = "/static/images/ico-like-active.png";
  const _imports_8 = "/static/images/ico-fold-up.png";
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "qa-item",
    props: {
      item: {
        type: Object,
        default: () => {
        },
        required: true
      }
    },
    setup(__props) {
      var _a;
      const props = __props;
      const content = (_a = props.item.content) !== null && _a !== void 0 ? _a : new UTSJSONObject({
        text: "",
        images: new Array()
      });
      const qDetailText = content.text;
      const images = content.images;
      const ansImages = vue.ref([]);
      const isExpand = vue.ref(false);
      const detail = vue.ref(new UTSJSONObject({}));
      const ansDetail = vue.ref(new UTSJSONObject({}));
      const isLoading = vue.ref(true);
      let isRequest = false;
      let sourceTypeMap = new UTSJSONObject({
        "1": "教材",
        "2": "试题",
        "3": "课程",
        "4": "云私塾"
      });
      const handerPreviewImage = (urls, index) => {
        uni.previewImage({
          urls,
          current: index
        });
      };
      function getAnsDetail() {
        let data = new UTSJSONObject({
          questionId: props.item.id
        });
        http.get("/japi/faq/v2/detail", data).then((res = null) => {
          var _a2, _b;
          isLoading.value = false;
          let info = respDataAsObject(res);
          let ansInfo = info.question_answer;
          if (ansInfo.id != null) {
            ansInfo.createDate = timeFormat(ansInfo.created_time, "yyyy.mm.dd");
            ansImages.value = (_b = (_a2 = ansInfo.content) === null || _a2 === void 0 ? null : _a2.images) !== null && _b !== void 0 ? _b : new Array();
            ansInfo.content_text = richTextAddInlineStyles(ansInfo.content_text, new UTSJSONObject({
              p: "font-size: 12px;color: #1F2937;line-height: 1.8;",
              li: "font-size: 12px;color: #1F2937;line-height: 1.8;",
              h1: "font-weight: 500;font-size: 12px;color: #1F2937;line-height: 1.6;",
              h2: "font-weight: 500;font-size: 12px;color: #1F2937;line-height: 1.6;",
              h3: "font-weight: 500;font-size: 12px;color: #1F2937;line-height: 1.6;"
            }));
            ansDetail.value = ansInfo;
          }
          detail.value = info;
        });
      }
      const handlerExpand = (value) => {
        isExpand.value = value;
        if (props.item.question_answer == null)
          return null;
        if (isRequest)
          return null;
        isRequest = true;
        getAnsDetail();
      };
      const handlerCollect = () => {
        let data = new UTSJSONObject({
          questionId: props.item.id,
          type: detail.value.have_collected == 0 ? 1 : 0
        });
        http.get("/japi/faq/collectQuestion", data).then((res = null) => {
          let text = "已取消收藏";
          if (data.type == 1) {
            text = "已收藏";
            detail.value.have_collected = 1;
            detail.value.collection_num = detail.value.collection_num + 1;
          } else {
            detail.value.have_collected = 0;
            detail.value.collection_num = detail.value.collection_num - 1;
          }
          props.item.collection_num = detail.value.collection_num;
          uni.showToast({
            title: text,
            icon: "none"
          });
        });
      };
      const handlerLike = () => {
        let data = new UTSJSONObject({
          answerId: ansDetail.value.id,
          type: ansDetail.value.hava_liked == 0 ? 1 : 0
        });
        http.get("/japi/faq/likeQuestion", data).then((res = null) => {
          let text = "已取消点赞";
          if (data.type == 1) {
            text = "已点赞";
            ansDetail.value.hava_liked = 1;
            ansDetail.value.like_num = ansDetail.value.like_num + 1;
          } else {
            ansDetail.value.hava_liked = 0;
            ansDetail.value.like_num = ansDetail.value.like_num - 1;
          }
          uni.showToast({
            title: text,
            icon: "none"
          });
        });
      };
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          class: "qa-item",
          onClick: _cache[1] || (_cache[1] = ($event = null) => {
            return handlerExpand(true);
          })
        }), [
          vue.createElementVNode("view", new UTSJSONObject({ class: "mark" }), [
            vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "问")
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "item-main" }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "item-top" }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString(__props.item.title), 1),
              __props.item.source_type != 0 ? (vue.openBlock(), vue.createElementBlock("text", new UTSJSONObject({
                key: 0,
                class: "tag"
              }), vue.toDisplayString(vue.unref(sourceTypeMap)[__props.item.source_type.toString()]), 1)) : vue.createCommentVNode("", true)
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "item-down" }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString(__props.item.user_name) + " " + vue.toDisplayString(__props.item.createDate), 1),
              !vue.unref(isExpand) ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                key: 0,
                class: "right"
              }), [
                vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString(__props.item.question_answer != null ? "有回答" : "无回答"), 1),
                vue.createElementVNode("view", new UTSJSONObject({ class: "action-item" }), [
                  vue.createElementVNode("image", new UTSJSONObject({
                    class: "ico",
                    src: _imports_0$4
                  })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString(__props.item.collection_num), 1)
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "action-item" }), [
                  vue.createElementVNode("image", new UTSJSONObject({
                    class: "ico",
                    src: _imports_1$2
                  })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString(__props.item.views), 1)
                ])
              ])) : vue.createCommentVNode("", true)
            ]),
            vue.unref(isExpand) ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
              key: 0,
              class: "detail"
            }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "rich-text" }), vue.toDisplayString(vue.unref(qDetailText)), 1),
              vue.unref(images).length != 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                key: 0,
                class: "pic-list"
              }), [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(images), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                    class: "pic-item",
                    key: index,
                    onClick: vue.withModifiers(($event = null) => {
                      return handerPreviewImage(vue.unref(images), index);
                    }, ["stop"])
                  }), [
                    vue.createElementVNode("image", new UTSJSONObject({
                      class: "image",
                      src: item,
                      mode: "aspectFill"
                    }), null, 8, ["src"])
                  ], 8, ["onClick"]);
                }), 128))
              ])) : vue.createCommentVNode("", true),
              __props.item.question_answer != null ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, new UTSJSONObject({ key: 1 }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "divider-line" }), [
                  vue.createElementVNode("view", new UTSJSONObject({ class: "line" })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "老师回答"),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "line" }))
                ]),
                vue.unref(isLoading) ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                  key: 0,
                  class: "loading-text"
                }), [
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "加载中...")
                ])) : (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                  key: 1,
                  class: "ans-section"
                }), [
                  vue.unref(ansDetail).is_best > 0 ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                    key: 0,
                    class: "adopt",
                    src: _imports_2
                  }))) : vue.createCommentVNode("", true),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "user-info" }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "avator" }), [
                      vue.unref(ansDetail).user_id == 0 ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                        key: 0,
                        class: "image",
                        src: _imports_3
                      }))) : (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                        key: 1,
                        class: "image",
                        src: _imports_4
                      })))
                    ]),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "info" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "nick-name" }), vue.toDisplayString(vue.unref(ansDetail).user_name), 1),
                      vue.createElementVNode("text", new UTSJSONObject({ class: "date" }), " 回答于 " + vue.toDisplayString(vue.unref(ansDetail).createDate), 1)
                    ])
                  ]),
                  vue.createElementVNode("view", new UTSJSONObject({ class: "ans-detail" }), [
                    vue.createElementVNode("view", new UTSJSONObject({ class: "mark mark-2" }), [
                      vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "答")
                    ]),
                    vue.createElementVNode("view", new UTSJSONObject({ class: "ans-detail-main" }), [
                      vue.createElementVNode("rich-text", new UTSJSONObject({
                        class: "rich-text",
                        nodes: vue.unref(ansDetail).content_text,
                        mode: "native"
                      }), null, 8, ["nodes"]),
                      vue.createTextVNode(" // "),
                      vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(ansDetail).content_text), 1),
                      vue.unref(ansImages).length != 0 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                        key: 0,
                        class: "pic-list"
                      }), [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(ansImages), (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                            class: "pic-item",
                            key: index,
                            onClick: vue.withModifiers(($event = null) => {
                              return handerPreviewImage(vue.unref(ansImages), index);
                            }, ["stop"])
                          }), [
                            vue.createElementVNode("image", new UTSJSONObject({
                              class: "image",
                              src: item,
                              mode: "aspectFill"
                            }), null, 8, ["src"])
                          ], 8, ["onClick"]);
                        }), 128))
                      ])) : vue.createCommentVNode("", true)
                    ])
                  ])
                ]))
              ], 64)) : vue.createCommentVNode("", true)
            ])) : vue.createCommentVNode("", true),
            vue.unref(isExpand) ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
              key: 1,
              class: "item-down"
            }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "t" })),
              vue.createElementVNode("view", new UTSJSONObject({ class: "right" }), [
                vue.createElementVNode("view", new UTSJSONObject({
                  class: "action-item",
                  onClick: vue.withModifiers(handlerCollect, ["stop"])
                }), [
                  vue.unref(detail).have_collected != 1 ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                    key: 0,
                    class: "ico",
                    src: _imports_0$4
                  }))) : (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                    key: 1,
                    class: "ico",
                    src: _imports_5
                  }))),
                  vue.createElementVNode("text", new UTSJSONObject({
                    class: vue.normalizeClass(["t", new UTSJSONObject({ active: vue.unref(detail).have_collected != 0 })])
                  }), vue.toDisplayString(vue.unref(detail).collection_num), 3)
                ]),
                vue.createElementVNode("view", new UTSJSONObject({
                  class: "action-item",
                  onClick: vue.withModifiers(handlerLike, ["stop"])
                }), [
                  vue.unref(ansDetail).hava_liked != 1 ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                    key: 0,
                    class: "ico",
                    src: _imports_6
                  }))) : (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                    key: 1,
                    class: "ico",
                    src: _imports_7
                  }))),
                  vue.createElementVNode("text", new UTSJSONObject({
                    class: vue.normalizeClass(["t", new UTSJSONObject({ active: vue.unref(ansDetail).hava_liked != 0 })])
                  }), vue.toDisplayString(vue.unref(ansDetail).like_num), 3)
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "action-item" }), [
                  vue.createElementVNode("image", new UTSJSONObject({
                    class: "ico",
                    src: _imports_1$2
                  })),
                  vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString(__props.item.views), 1)
                ])
              ])
            ])) : vue.createCommentVNode("", true),
            vue.unref(isExpand) ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
              key: 2,
              class: "item-footer"
            }), [
              vue.createElementVNode("view", new UTSJSONObject({
                class: "expand-btn",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event = null) => {
                  return handlerExpand(false);
                }, ["stop"]))
              }), [
                vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "收起"),
                vue.createElementVNode("image", new UTSJSONObject({
                  class: "ico",
                  src: _imports_8
                }))
              ])
            ])) : vue.createCommentVNode("", true)
          ])
        ]);
      };
    }
  });
  const _style_0$6 = { "qa-item": { "": { "display": "flex", "flexDirection": "row" } }, "mark": { "": { "width": "11rpx", "height": "13rpx", "backgroundImage": "none", "backgroundColor": "#4F46E5", "borderTopLeftRadius": "2rpx", "borderTopRightRadius": "2rpx", "borderBottomRightRadius": "0rpx", "borderBottomLeftRadius": "2rpx", "marginRight": "4rpx" }, ".mark-2": { "backgroundImage": "none", "backgroundColor": "#55b899" } }, "t": { ".mark ": { "fontWeight": "700", "fontSize": "7rpx", "color": "#FFFFFF", "lineHeight": "13rpx", "textAlign": "center" }, ".mark.mark-2 ": { "color": "#ffffff" }, ".item-top ": { "fontWeight": "700", "fontSize": "10rpx", "color": "#000000", "lineHeight": "15rpx", "flexShrink": 1 }, ".item-down ": { "fontSize": "8rpx", "color": "#9499A7", "lineHeight": "11rpx" }, ".item-footer ": { "fontSize": "9rpx", "color": "#000000", "lineHeight": "10rpx" }, ".divider-line ": { "fontSize": "10rpx", "color": "#000000", "lineHeight": "15rpx", "paddingTop": 0, "paddingRight": "10.42rpx", "paddingBottom": 0, "paddingLeft": "10.42rpx" }, ".loading-text ": { "fontSize": "10rpx", "textAlign": "center", "color": "#666666" } }, "item-main": { "": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%" } }, "item-top": { "": { "marginBottom": "10rpx", "display": "flex", "flexDirection": "row" } }, "tag": { ".item-top ": { "height": "12.5rpx", "marginLeft": "2rpx", "borderTopLeftRadius": "2rpx", "borderTopRightRadius": "2rpx", "borderBottomRightRadius": "2rpx", "borderBottomLeftRadius": "2rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#9AA7B6", "borderRightColor": "#9AA7B6", "borderBottomColor": "#9AA7B6", "borderLeftColor": "#9AA7B6", "paddingTop": 0, "paddingRight": "4.2rpx", "paddingBottom": 0, "paddingLeft": "4.2rpx", "lineHeight": "12rpx", "fontSize": "7rpx", "color": "#94A2B2", "flexShrink": 0, "marginTop": "1.6rpx" } }, "item-down": { "": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" } }, "right": { ".item-down ": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "action-item": { ".item-down ": { "display": "flex", "flexDirection": "row", "marginLeft": "12rpx" } }, "ico": { ".item-down .action-item ": { "width": "10.42rpx", "height": "10.42rpx", "marginRight": "3.13rpx" }, ".item-footer ": { "width": "10.42rpx", "height": "10.42rpx", "marginLeft": "4.17rpx" } }, "active": { ".item-down .action-item ": { "color": "#4F46E5" } }, "item-footer": { "": { "paddingTop": "10.42rpx", "display": "flex", "flexDirection": "row", "justifyContent": "flex-end" } }, "expand-btn": { ".item-footer ": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "detail": { "": { "paddingTop": "20rpx" } }, "divider-line": { "": { "paddingTop": "12rpx", "paddingRight": 0, "paddingBottom": "12rpx", "paddingLeft": 0, "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "line": { ".divider-line ": { "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "height": 0, "borderTopWidth": "1rpx", "borderTopStyle": "dashed", "borderTopColor": "#E7EEFF" } }, "ans-section": { "": { "position": "relative" } }, "adopt": { ".ans-section ": { "position": "absolute", "right": "18rpx", "top": "25rpx", "width": "41.67rpx", "height": "41.67rpx" } }, "user-info": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "marginBottom": "12.5rpx" } }, "avator": { ".user-info ": { "width": "27.08rpx", "height": "27.08rpx", "marginRight": "7.3rpx" } }, "image": { ".user-info .avator ": { "width": "100%", "height": "100%" }, ".pic-list .pic-item ": { "width": "100%", "height": "100%", "borderTopLeftRadius": "6rpx", "borderTopRightRadius": "6rpx", "borderBottomRightRadius": "6rpx", "borderBottomLeftRadius": "6rpx" } }, "nick-name": { ".user-info .info ": { "fontWeight": "700", "fontSize": "8rpx", "color": "rgba(0,0,0,0.85)", "lineHeight": "10rpx", "marginBottom": "4.17rpx" } }, "date": { ".user-info .info ": { "fontSize": "8rpx", "color": "#9698A2", "lineHeight": "10rpx" } }, "rich-text": { "": { "marginBottom": "13.5rpx", "fontSize": "10rpx", "color": "#000000", "lineHeight": "15rpx" } }, "pic-list": { "": { "marginBottom": "13.5rpx", "display": "flex", "flexDirection": "row" } }, "pic-item": { ".pic-list ": { "width": "60rpx", "height": "60rpx", "marginRight": "8rpx", "marginBottom": "8rpx" } }, "ans-detail": { "": { "display": "flex", "flexDirection": "row" } }, "ans-detail-main": { ".ans-detail ": { "flexGrow": 1, "flexShrink": 0, "flexBasis": "0%" } }, "loading-text": { "": { "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0 } } };
  const qaItem = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["styles", [_style_0$6]]]);
  const _imports_0$3 = "/static/images/ico-search.png";
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "input-select",
    props: {
      modelValue: {
        type: String,
        default: ""
      }
    },
    emits: ["update:modelValue"],
    setup(__props, _a) {
      var __emit = _a.emit;
      const emit = __emit;
      const isFocus = vue.ref(false);
      const modalStyle = vue.ref(new UTSJSONObject({}));
      const handlerFocus = () => {
        isFocus.value = true;
      };
      const handlerBlur = () => {
        isFocus.value = false;
      };
      const input = (e) => {
        emit("update:modelValue", e.detail.value);
      };
      vue.onMounted(() => {
        const query = uni.createSelectorQuery();
        query.select(".input-select").boundingClientRect((rect = null) => {
          const r = rect;
          modalStyle.value = new UTSJSONObject({
            top: "".concat(r.bottom, "px"),
            left: "".concat(r.left, "px"),
            width: "".concat(r.width, "px")
          });
        }).exec();
      });
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "input-select" }), [
          vue.createElementVNode("image", new UTSJSONObject({
            class: "ico",
            onClick: handlerFocus,
            src: _imports_0$3
          })),
          vue.createElementVNode("input", vue.mergeProps(new UTSJSONObject({
            focus: vue.unref(isFocus),
            class: "input",
            type: "text"
          }), _ctx.$attrs, new UTSJSONObject({
            "cursor-color": "#4F46E5",
            onBlur: handlerBlur,
            onFocus: handlerFocus,
            "placeholder-class": "placeholder",
            value: __props.modelValue,
            onInput: input
          })), null, 16, ["focus", "value"])
        ]);
      };
    }
  });
  const _style_0$5 = { "input-select": { "": { "width": "244rpx", "height": "23rpx", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "0rpx", "borderBottomRightRadius": "0rpx", "borderBottomLeftRadius": "4rpx", "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#D9D9D9", "borderRightColor": "#D9D9D9", "borderBottomColor": "#D9D9D9", "borderLeftColor": "#D9D9D9", "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "ico": { ".input-select ": { "width": "9.9rpx", "height": "9.24rpx", "marginLeft": "8rpx" } }, "input": { ".input-select ": { "paddingTop": 0, "paddingRight": "4rpx", "paddingBottom": 0, "paddingLeft": "4rpx", "flexGrow": 1, "flexShrink": 1, "flexBasis": "0%", "height": "100%", "fontSize": "8rpx", "color": "#171920" } }, "placeholder": { "": { "fontSize": 11, "color": "#9796AF" } }, "list": { "": { "position": "fixed", "left": 0, "top": 0, "width": "100%", "height": "200rpx", "backgroundImage": "none", "backgroundColor": "#000000", "zIndex": 2 } } };
  const inputSelect = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["styles", [_style_0$5]]]);
  const _imports_0$2 = "/static/images/ico-select-arrow.png";
  const _imports_1$1 = "/static/images/ico-select-suc.png";
  class Item extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            label: { type: String, optional: false },
            value: { type: Number, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = Item.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.label = this.__props__.label;
      this.value = this.__props__.value;
      delete this.__props__;
    }
  }
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "type-select",
    emits: ["change"],
    setup(__props, _a) {
      var __emit = _a.emit;
      const emit = __emit;
      const isFocus = vue.ref(false);
      const modalStyle = vue.ref(new UTSJSONObject({}));
      const sysInfo = uni.getSystemInfoSync();
      const selectItem = vue.ref(new Item({
        label: "全部类型",
        value: 0
      }));
      const list = [
        new Item({
          label: "全部类型",
          value: 0
        }),
        new Item({
          label: "教材",
          value: 1
        }),
        new Item({
          label: "试题",
          value: 2
        }),
        new Item({
          label: "课程",
          value: 3
        }),
        new Item({
          label: "云私塾",
          value: 4
        })
      ];
      const handler = () => {
        isFocus.value = true;
      };
      const handlerChange = (item) => {
        selectItem.value = item;
        isFocus.value = false;
        emit("change", item.value);
      };
      const handlerClose = () => {
        isFocus.value = false;
      };
      vue.onMounted(() => {
        const query = uni.createSelectorQuery();
        query.select(".selected-value").boundingClientRect((rect = null) => {
          const r = rect;
          modalStyle.value = new UTSJSONObject({
            top: "".concat(r.bottom + 10, "px"),
            right: "".concat(sysInfo.windowWidth - r.right - 10, "px")
          });
        }).exec();
      });
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "type-select" }), [
          vue.createElementVNode("view", new UTSJSONObject({
            class: "selected-value",
            onClick: handler
          }), [
            vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString(vue.unref(selectItem).label), 1),
            vue.createElementVNode("image", new UTSJSONObject({
              class: vue.normalizeClass(["ico", new UTSJSONObject({ expand: vue.unref(isFocus) })]),
              src: _imports_0$2
            }), null, 2)
          ]),
          vue.unref(isFocus) ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
            key: 0,
            class: "mask",
            onClick: handlerClose
          }))) : vue.createCommentVNode("", true),
          vue.unref(isFocus) ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
            key: 1,
            class: "pull-down-list",
            style: vue.normalizeStyle(vue.unref(modalStyle))
          }), [
            (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(list, (item, index) => {
              return vue.createElementVNode("view", new UTSJSONObject({
                class: vue.normalizeClass(["option-item", new UTSJSONObject({ active: vue.unref(selectItem).value == item.value })]),
                key: index,
                onClick: ($event = null) => {
                  return handlerChange(item);
                }
              }), [
                vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString(item.label), 1),
                vue.unref(selectItem).value == item.value ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                  key: 0,
                  class: "ico",
                  src: _imports_1$1
                }))) : vue.createCommentVNode("", true)
              ], 10, ["onClick"]);
            }), 64))
          ], 4)) : vue.createCommentVNode("", true)
        ]);
      };
    }
  });
  const _style_0$4 = { "selected-value": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "paddingTop": "4rpx", "paddingRight": 0, "paddingBottom": "4rpx", "paddingLeft": 0 } }, "t": { ".selected-value ": { "fontSize": "9rpx", "color": "#1B1B48", "lineHeight": "10rpx" }, ".option-item ": { "fontWeight": "700", "fontSize": "10rpx", "color": "#1B1B48", "lineHeight": "17rpx" } }, "ico": { ".selected-value ": { "width": "10.42rpx", "height": "10.42rpx", "marginLeft": "4.17rpx", "transform": "rotate(180deg)", "transitionProperty": "all", "transitionDuration": "0.3s" }, ".option-item ": { "width": "10.42rpx", "height": "10.47rpx" } }, "expand": { ".selected-value ": { "transform": "rotate(0)" } }, "mask": { "": { "position": "fixed", "left": 0, "top": 0, "width": "100%", "height": "100%", "zIndex": 1 } }, "pull-down-list": { "": { "position": "fixed", "right": 0, "top": 0, "width": "200rpx", "zIndex": 2, "backgroundImage": "none", "backgroundColor": "#FFFFFF", "boxShadow": "0rpx 1rpx 12rpx rgba(115, 112, 151, 0.3)", "borderTopLeftRadius": "10rpx", "borderTopRightRadius": "10rpx", "borderBottomRightRadius": "10rpx", "borderBottomLeftRadius": "10rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(151,150,175,0.3)", "borderRightColor": "rgba(151,150,175,0.3)", "borderBottomColor": "rgba(151,150,175,0.3)", "borderLeftColor": "rgba(151,150,175,0.3)", "paddingTop": "8.3rpx", "paddingRight": "6.25rpx", "paddingBottom": "6.25rpx", "paddingLeft": "6.25rpx" } }, "option-item": { "": { "paddingTop": 0, "paddingRight": "10.42rpx", "paddingBottom": 0, "paddingLeft": "10.42rpx", "height": "33rpx", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "4rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": "4rpx", "marginBottom": "2.08rpx" }, ".active": { "backgroundImage": "none", "backgroundColor": "rgba(82,94,251,0.12)" } }, "@TRANSITION": { "ico": { "property": "all", "duration": "0.3s" } } };
  const typeSelect = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["styles", [_style_0$4]]]);
  const _imports_0$1 = "/static/images/ico-upload-remove.png";
  const _imports_1 = "/static/images/ico-upload-fail.png";
  class UploadFileItem extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            previewPath: { type: String, optional: false },
            url: { type: String, optional: false },
            state: { type: "Unknown", optional: false },
            progress: { type: Number, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = UploadFileItem.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.previewPath = this.__props__.previewPath;
      this.url = this.__props__.url;
      this.state = this.__props__.state;
      this.progress = this.__props__.progress;
      delete this.__props__;
    }
  }
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "c-upload",
    props: {
      fileList: {
        type: Array,
        default: () => {
          return new Array();
        }
      },
      isMultiple: {
        type: Boolean,
        default: false
      },
      limtSize: {
        type: Number,
        default: 10
        //10mb
      },
      fileCount: {
        type: Number,
        default: 5
        //10mb
      }
    },
    emits: ["change"],
    setup(__props, _a) {
      var __emit = _a.emit;
      const props = __props;
      const emit = __emit;
      const uploadFileList = vue.ref([]);
      props.fileList.forEach((path) => {
        uploadFileList.value.push(new UploadFileItem({
          previewPath: path,
          url: path,
          state: 0,
          progress: 0
        }));
      });
      const handlerRemove = (index) => {
        uploadFileList.value.splice(index, 1);
        emit("change", uploadFileList.value.filter((item) => {
          return item.state == 0;
        }).map((item) => {
          return item.url;
        }));
      };
      const submitUpload = (file, index) => {
        let httpTaskKey = "".concat(file.path, "--").concat(Date.now());
        http.upload("/japi/uc/v2/study/upload", new UTSJSONObject({}), new UTSJSONObject({
          name: "file",
          filePath: file.path,
          headers: new UTSJSONObject({
            "Content-Type": "multipart/form-data"
          }),
          httpTaskKey
        })).then((res = null) => {
          var _a2, _b, _c;
          let r = res;
          if (r.success == true) {
            let url = (_c = (_b = (_a2 = r.data) !== null && _a2 !== void 0 ? _a2 : new UTSJSONObject({})) === null || _b === void 0 ? null : _b.url) !== null && _c !== void 0 ? _c : "";
            uploadFileList.value[index].url = url;
            uploadFileList.value[index].state = 0;
            emit("change", uploadFileList.value.filter((item) => {
              return item.state == 0;
            }).map((item) => {
              return item.url;
            }));
          } else {
            uploadFileList.value[index].state = 2;
          }
        });
        let uploadTask = UTS.mapGet(http.uploadTaskMap, httpTaskKey);
        if (uploadTask != null) {
          uploadTask.onProgressUpdate((res) => {
            uploadFileList.value[index].progress = res.progress;
          });
        }
      };
      const handlerChooseFile = () => {
        uni.chooseFile(new UTSJSONObject({
          type: "image",
          count: 1,
          success: (res) => {
            let file = res.tempFiles[0];
            const isLt = file.size / 1024 / 1024 < props.limtSize;
            if (!isLt) {
              uni.showToast({
                title: "图片上传失败，图片不能超过".concat(props.limtSize, "MB的文件")
              });
              return null;
            }
            uploadFileList.value.push(new UploadFileItem({
              previewPath: file.path,
              url: "",
              state: 1,
              progress: 0
            }));
            submitUpload(file, uploadFileList.value.length - 1);
          }
        }));
      };
      const handerPreviewImage = (index) => {
        let urls = uploadFileList.value.map((item) => {
          return item.previewPath;
        });
        uni.previewImage({
          urls,
          current: index
        });
      };
      return (_ctx = null, _cache = null) => {
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "upload-list" }), [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(uploadFileList), (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
              class: vue.normalizeClass(["upload-item", new UTSJSONObject({ border: item.state != 1 })]),
              key: index
            }), [
              item.state != 1 ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                key: 0,
                class: "remove",
                src: _imports_0$1,
                onClick: ($event = null) => {
                  return handlerRemove(index);
                }
              }), null, 8, ["onClick"])) : vue.createCommentVNode("", true),
              item.previewPath != "" && item.state != 2 ? (vue.openBlock(), vue.createElementBlock("image", new UTSJSONObject({
                key: 1,
                src: item.previewPath,
                class: "preview-image",
                mode: "aspectFill",
                onClick: ($event = null) => {
                  return handerPreviewImage(index);
                }
              }), null, 8, ["src", "onClick"])) : vue.createCommentVNode("", true),
              item.state == 1 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                key: 2,
                class: "upload-progress"
              }), [
                vue.createElementVNode("view", new UTSJSONObject({ class: "upload-line" }), [
                  vue.createElementVNode("view", new UTSJSONObject({
                    class: "upload-progress-line",
                    style: vue.normalizeStyle({ width: item.progress + "%" })
                  }), null, 4)
                ]),
                vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "上传中")
              ])) : vue.createCommentVNode("", true),
              item.state == 2 ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
                key: 3,
                class: "upload-fail"
              }), [
                vue.createElementVNode("image", new UTSJSONObject({
                  class: "ico",
                  src: _imports_1
                })),
                vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "上传失败")
              ])) : vue.createCommentVNode("", true)
            ], 2);
          }), 128)),
          vue.unref(uploadFileList).length < __props.fileCount ? (vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
            key: 0,
            class: "upload-item border"
          }), [
            vue.createElementVNode("view", new UTSJSONObject({
              class: "upload-btn",
              onClick: handlerChooseFile
            }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "+")
            ])
          ])) : vue.createCommentVNode("", true)
        ]);
      };
    }
  });
  const _style_0$3 = { "upload-list": { "": { "display": "flex", "flexDirection": "row", "flexWrap": "wrap", "paddingTop": "5rpx" } }, "upload-item": { "": { "width": "41.67rpx", "height": "41.67rpx", "backgroundImage": "none", "backgroundColor": "#F2F2F2", "borderTopLeftRadius": "2rpx", "borderTopRightRadius": "2rpx", "borderBottomRightRadius": "2rpx", "borderBottomLeftRadius": "2rpx", "position": "relative", "marginRight": "6.25rpx", "overflow": "visible" }, ".border": { "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#E8E8E9", "borderRightColor": "#E8E8E9", "borderBottomColor": "#E8E8E9", "borderLeftColor": "#E8E8E9" } }, "remove": { ".upload-item ": { "width": "10rpx", "height": "10rpx", "position": "absolute", "top": 0, "right": 0, "transform": "translate(48%, -48%)", "zIndex": 9 } }, "upload-fail": { "": { "width": "100%", "height": "100%", "display": "flex", "flexDirection": "column", "justifyContent": "center", "alignItems": "center", "backgroundImage": "none", "backgroundColor": "#ffffff" } }, "ico": { ".upload-fail ": { "width": "12rpx", "height": "12rpx", "marginBottom": "2rpx" } }, "t": { ".upload-fail ": { "fontSize": "7rpx", "color": "#FF6447", "lineHeight": "9rpx" }, ".upload-progress ": { "fontSize": "7rpx", "color": "#ffffff", "lineHeight": "9rpx" }, ".upload-btn ": { "fontSize": "20rpx", "color": "#DADADB", "lineHeight": 1.3 } }, "upload-progress": { "": { "width": "100%", "height": "100%", "position": "absolute", "left": 0, "top": 0, "backgroundImage": "none", "backgroundColor": "rgba(0,0,0,0.4)", "zIndex": 1, "justifyContent": "center", "alignItems": "center" } }, "upload-line": { ".upload-progress ": { "width": "80%", "backgroundImage": "none", "backgroundColor": "#FFFFFF", "height": "3rpx", "borderTopLeftRadius": "2rpx", "borderTopRightRadius": "2rpx", "borderBottomRightRadius": "2rpx", "borderBottomLeftRadius": "2rpx", "marginBottom": "3rpx", "marginTop": "8rpx" } }, "upload-progress-line": { ".upload-progress ": { "height": "100%", "borderTopLeftRadius": "2rpx", "borderTopRightRadius": "2rpx", "borderBottomRightRadius": "2rpx", "borderBottomLeftRadius": "2rpx", "width": "0%", "backgroundImage": "none", "backgroundColor": "#4F46E5" } }, "upload-btn": { "": { "width": "100%", "height": "100%", "display": "flex", "justifyContent": "center", "alignItems": "center" } }, "preview-image": { "": { "width": "100%", "height": "100%" } } };
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["styles", [_style_0$3]]]);
  const _imports_0 = "/static/images/ico-close.png";
  const maxlength = 500;
  class ModeType extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            title: { type: String, optional: false },
            content: { type: String, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = ModeType.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.title = this.__props__.title;
      this.content = this.__props__.content;
      delete this.__props__;
    }
  }
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "question-modal",
    props: {
      visible: {
        type: Boolean
      }
    },
    emits: ["confirm", "close"],
    setup(__props, _a) {
      var __emit = _a.emit;
      const emit = __emit;
      const model = vue.reactive(new ModeType({
        title: "",
        content: ""
      }));
      let fileList = [];
      const handlerClose = () => {
        emit("close");
      };
      const disabled = vue.computed(() => {
        return model.title == "" || model.content == "";
      });
      const uploadChange = (e) => {
        fileList = e;
      };
      const handlerSubmit = () => {
        emit("confirm", new UTSJSONObject({
          title: model.title,
          content_text: model.content,
          images: fileList.join(",")
        }));
      };
      return (_ctx = null, _cache = null) => {
        const _component_c_upload = resolveEasycom(vue.resolveDynamicComponent("c-upload"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({ class: "modal" }), [
          vue.createElementVNode("view", new UTSJSONObject({ class: "mask" })),
          vue.createElementVNode("view", new UTSJSONObject({ class: "popup" }), [
            vue.createElementVNode("image", new UTSJSONObject({
              class: "close",
              src: _imports_0,
              onClick: handlerClose
            })),
            vue.createElementVNode("view", new UTSJSONObject({ class: "title" }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "我要提问")
            ]),
            vue.withDirectives(vue.createElementVNode("input", new UTSJSONObject({
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event = null) => {
                return vue.unref(model).title = $event;
              }),
              class: "input",
              placeholder: "请输入问题标题（必填）",
              "placeholder-style": "color:#666;font-weight: 400;"
            }), null, 512), [
              [vue.vModelText, vue.unref(model).title]
            ]),
            vue.withDirectives(vue.createElementVNode("textarea", new UTSJSONObject({
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event = null) => {
                return vue.unref(model).content = $event;
              }),
              class: "textarea",
              maxlength,
              placeholder: "问题描述越清晰，越有可能得到有价值答案"
            }), "\n			", 512), [
              [vue.vModelText, vue.unref(model).content]
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "count" }), [
              vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), vue.toDisplayString(vue.unref(model).content.length), 1),
              vue.createElementVNode("text", new UTSJSONObject({ class: "t" }), "/" + vue.toDisplayString(maxlength))
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "upload-box" }), [
              vue.createVNode(_component_c_upload, new UTSJSONObject({
                class: "upload-list",
                onChange: uploadChange
              })),
              vue.createElementVNode("text", new UTSJSONObject({ class: "tips" }), "最多上传5张，每张不超过10M")
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "popup-footer" }), [
              vue.createElementVNode("view", new UTSJSONObject({ class: "tips" })),
              vue.createElementVNode("view", new UTSJSONObject({ class: "action" }), [
                vue.createElementVNode("button", new UTSJSONObject({
                  class: "btn btn-cancel",
                  onClick: handlerClose
                }), "取消"),
                vue.createElementVNode("button", new UTSJSONObject({
                  class: vue.normalizeClass(["btn btn-confirm", new UTSJSONObject({ "btn-disabled": vue.unref(disabled) })]),
                  disabled: vue.unref(disabled),
                  onClick: handlerSubmit
                }), " 确认 ", 10, ["disabled"])
              ])
            ])
          ])
        ]);
      };
    }
  });
  const _style_0$2 = { "mask": { "": { "width": "100%", "height": "100%", "backgroundImage": "none", "backgroundColor": "rgba(0,0,0,0.5)", "position": "fixed", "left": 0, "top": 0, "zIndex": 9 } }, "popup": { "": { "width": "276rpx", "backgroundImage": "none", "backgroundColor": "#FFFFFF", "position": "fixed", "left": "50%", "top": "50%", "transform": "translate(-50%, -50%)", "zIndex": 9, "borderTopLeftRadius": "6rpx", "borderTopRightRadius": "6rpx", "borderBottomRightRadius": "6rpx", "borderBottomLeftRadius": "6rpx", "paddingTop": "16rpx", "paddingRight": "10.42rpx", "paddingBottom": "10.42rpx", "paddingLeft": "10.42rpx" } }, "close": { "": { "width": "12.5rpx", "height": "12.5rpx", "position": "absolute", "right": "6.25rpx", "top": "6.25rpx" } }, "title": { "": { "marginBottom": "20.83rpx" } }, "t": { ".title ": { "fontWeight": "700", "fontSize": "9rpx", "color": "#171920", "lineHeight": "13rpx", "textAlign": "center" }, ".count ": { "fontWeight": "700", "fontSize": "7rpx", "color": "#666666", "lineHeight": "10rpx" }, ".popup-footer .tips ": { "fontSize": "7rpx", "color": "#F1403C", "lineHeight": "10rpx" } }, "input": { "": { "borderTopWidth": "medium", "borderRightWidth": "medium", "borderBottomWidth": "medium", "borderLeftWidth": "medium", "borderTopStyle": "none", "borderRightStyle": "none", "borderBottomStyle": "none", "borderLeftStyle": "none", "borderTopColor": "#000000", "borderRightColor": "#000000", "borderBottomColor": "#000000", "borderLeftColor": "#000000", "paddingTop": "4.2rpx", "paddingRight": "4.2rpx", "paddingBottom": "4.2rpx", "paddingLeft": "4.2rpx", "width": "100%", "fontWeight": "700", "fontSize": "13rpx", "color": "#171920", "marginBottom": "6rpx" } }, "textarea": { "": { "width": "100%", "height": "94rpx", "borderTopLeftRadius": "2rpx", "borderTopRightRadius": "2rpx", "borderBottomRightRadius": "2rpx", "borderBottomLeftRadius": "2rpx", "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#EDEDED", "borderRightColor": "#EDEDED", "borderBottomColor": "#EDEDED", "borderLeftColor": "#EDEDED", "paddingTop": "8.2rpx", "paddingRight": "8.2rpx", "paddingBottom": "8.2rpx", "paddingLeft": "8.2rpx", "marginBottom": "4.17rpx", "fontSize": "8rpx", "color": "#666666", "lineHeight": "11rpx" } }, "count": { "": { "flexDirection": "row", "justifyContent": "flex-end", "marginBottom": "8rpx" } }, "upload-box": { "": { "marginBottom": "20rpx" } }, "upload-list": { ".upload-box ": { "marginBottom": "4.17rpx" } }, "tips": { ".upload-box ": { "fontSize": "7rpx", "color": "#666666", "lineHeight": "10rpx" }, ".popup-footer ": { "marginRight": "12rpx" } }, "popup-footer": { "": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" } }, "action": { ".popup-footer ": { "display": "flex", "flexDirection": "row" } }, "btn": { ".popup-footer ": { "width": "44rpx", "height": "21rpx", "borderTopLeftRadius": "3rpx", "borderTopRightRadius": "3rpx", "borderBottomRightRadius": "3rpx", "borderBottomLeftRadius": "3rpx", "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#4F46E5", "borderRightColor": "#4F46E5", "borderBottomColor": "#4F46E5", "borderLeftColor": "#4F46E5", "fontWeight": "700", "fontSize": "8rpx", "color": "#4F46E5", "lineHeight": "21rpx", "backgroundImage": "none", "backgroundColor": "rgba(0,0,0,0)" } }, "btn-confirm": { ".popup-footer ": { "backgroundImage": "none", "backgroundColor": "#4F46E5", "color": "#ffffff", "marginLeft": "12.5rpx" } }, "btn-disabled": { ".popup-footer ": { "opacity": 0.5 } } };
  const questionModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["styles", [_style_0$2]]]);
  class PageInfo extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            pageIndex: { type: Number, optional: false },
            pageSize: { type: Number, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = PageInfo.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.pageIndex = this.__props__.pageIndex;
      this.pageSize = this.__props__.pageSize;
      delete this.__props__;
    }
  }
  class Types extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            isSelf: { type: Boolean, optional: false },
            isCollect: { type: Boolean, optional: false }
          };
        }
      };
    }
    constructor(options, metadata = Types.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.isSelf = this.__props__.isSelf;
      this.isCollect = this.__props__.isCollect;
      delete this.__props__;
    }
  }
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      let pageInfo = new PageInfo({
        pageIndex: 1,
        pageSize: 10
      });
      const isLoading = vue.ref(true);
      const isMore = vue.ref(true);
      const types = vue.reactive(new Types({
        isSelf: false,
        isCollect: false
      }));
      const sourceType = vue.ref(0);
      const searchText = vue.ref("");
      const list = vue.ref([]);
      const isShowModal = vue.ref(false);
      let answerType = 2;
      let serveCateList = [];
      function getList() {
        uni.__log__("log", "at pages/question-ans/index.uvue:104", 11122, state$1.activeCategory);
        let data = new UTSJSONObject({
          type: 4,
          sourceType: sourceType.value,
          from: pageInfo.pageSize * (pageInfo.pageIndex - 1),
          rows: pageInfo.pageSize,
          withToken: true,
          secondCategory: state$1.activeCategory.secondCategoryId,
          categoryId: state$1.activeCategory.categoryId
        });
        if (types.isSelf) {
          data.type = 2;
        }
        if (types.isCollect) {
          data.type = 3;
        }
        let url = "/japi/faq/getQuestionList";
        if (searchText.value != "") {
          data.title = searchText.value;
          url = "/japi/faq/searchQuestion";
        }
        isLoading.value = true;
        http.get(url, data).then((res = null) => {
          var _a;
          isLoading.value = false;
          let info = respDataAsObject(res);
          let l = info.list;
          let total = (_a = info === null || info === void 0 ? null : info.total) !== null && _a !== void 0 ? _a : 0;
          l.forEach((item) => {
            item.createDate = timeFormat(item.created_time, "yyyy.mm.dd");
          });
          if (pageInfo.pageIndex == 1) {
            list.value = l;
          } else {
            list.value.push(...l);
          }
          if (list.value.length >= total) {
            isMore.value = false;
          }
        });
      }
      function getAnswerTypeList() {
        new UTSJSONObject({
          categoryId: state$1.activeCategory.categoryId,
          productId: state$1.activeCategory.productId,
          isAl: state$1.isAl
        });
        http.get("/japi/faq/v2/getAnswerTypeList").then((res = null) => {
          let l = respDataAsArray(res);
          l.forEach((item) => {
            if (item.defaultFlag == 1) {
              answerType = item.value;
            }
          });
        });
      }
      function getUserGoodsCategories() {
        let data = new UTSJSONObject({
          goodsId: state$1.goodsId
        });
        http.get("/japi/faq/getUserGoodsCategories", data).then((res = null) => {
          serveCateList = respDataAsArray(res);
        });
      }
      function init() {
        isMore.value = true;
        pageInfo.pageIndex = 1;
        list.value = [];
        getList();
      }
      const handlerSearch = () => {
        init();
      };
      const handlerCategoryChange = (item) => {
        init();
        getAnswerTypeList();
      };
      const handlerSubmit = (options) => {
        let data = new UTSJSONObject(Object.assign({ device: "pc", source: "uc_yss", isAl: state$1.isAl, answerType, goodsId: state$1.goodsId, categoryId: state$1.activeCategory.categoryId, productId: state$1.activeCategory.productId }, options));
        if (answerType == 1) {
          data["isStream"] = 1;
        }
        http.post("/japi/faq/v2/addQuestionApp", data).then((res = null) => {
          uni.showToast({
            title: "提交成功",
            icon: "none"
          });
          isShowModal.value = false;
          init();
        });
      };
      const handlerCheckChange = (value = null, type) => {
        if (value == true) {
          if (type == "isSelf")
            types.isCollect = false;
          if (type == "isCollect")
            types.isSelf = false;
        }
        init();
      };
      const scrolltolower = () => {
        if (!isMore.value || isLoading.value)
          return null;
        pageInfo.pageIndex++;
        getList();
      };
      const handlerShowModal = () => {
        if (serveCateList.length == 0 || serveCateList.filter((item) => {
          return item.id == state$1.activeCategory.categoryId;
        }).length == 0) {
          return uni.showToast({
            title: "您购买的课程当前科目暂不包含答疑服务，请联系课程顾问购买～",
            icon: "none"
          });
        }
        isShowModal.value = true;
      };
      const handlerCloseModal = () => {
        isShowModal.value = false;
        uni.__log__("log", "at pages/question-ans/index.uvue:237", isShowModal.value);
      };
      const handlerTypeSelectChange = (value) => {
        sourceType.value = value;
        init();
      };
      vue.onLoad((e) => {
        categoryInitState(e).then((activeCategoryInfo) => {
          getList();
          getAnswerTypeList();
          getUserGoodsCategories();
        });
      });
      return (_ctx = null, _cache = null) => {
        const _component_c_loading = resolveEasycom(vue.resolveDynamicComponent("c-loading"), __easycom_0$1);
        const _component_c_global_state = resolveEasycom(vue.resolveDynamicComponent("c-global-state"), _sfc_main$8);
        const _component_c_checkbox = resolveEasycom(vue.resolveDynamicComponent("c-checkbox"), __easycom_2);
        const _component_c_navbar = resolveEasycom(vue.resolveDynamicComponent("c-navbar"), __easycom_3);
        const _component_c_category_tab = resolveEasycom(vue.resolveDynamicComponent("c-category-tab"), __easycom_4);
        const _component_c_scroll_loading_tips = resolveEasycom(vue.resolveDynamicComponent("c-scroll-loading-tips"), __easycom_5);
        const _component_c_empty = resolveEasycom(vue.resolveDynamicComponent("c-empty"), __easycom_6);
        return vue.openBlock(), vue.createElementBlock("view", new UTSJSONObject({
          class: "page",
          style: new UTSJSONObject({ "flex": "1" })
        }), [
          vue.unref(isLoading) && vue.unref(list).length == 0 ? (vue.openBlock(), vue.createBlock(_component_c_loading, new UTSJSONObject({ key: 0 }))) : vue.createCommentVNode("", true),
          vue.createVNode(_component_c_global_state),
          vue.createVNode(_component_c_navbar, new UTSJSONObject({
            class: "navbar",
            title: "答疑"
          }), {
            ["navbar-right"]: vue.withCtx(() => {
              return [
                vue.createElementVNode("view", new UTSJSONObject({ class: "action-item" }), [
                  vue.createVNode(_component_c_checkbox, new UTSJSONObject({
                    modelValue: vue.unref(types).isSelf,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event = null) => {
                      return vue.unref(types).isSelf = $event;
                    }),
                    onChange: _cache[1] || (_cache[1] = ($event = null) => {
                      return handlerCheckChange($event, "isSelf");
                    })
                  }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "我的提问")
                      ];
                    }),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", new UTSJSONObject({ class: "action-item" }), [
                  vue.createVNode(_component_c_checkbox, new UTSJSONObject({
                    modelValue: vue.unref(types).isCollect,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event = null) => {
                      return vue.unref(types).isCollect = $event;
                    }),
                    onChange: _cache[3] || (_cache[3] = ($event = null) => {
                      return handlerCheckChange($event, "isCollect");
                    })
                  }), {
                    default: vue.withCtx(() => {
                      return [
                        vue.createElementVNode("text", new UTSJSONObject({ class: "text" }), "我的收藏")
                      ];
                    }),
                    _: 1
                  }, 8, ["modelValue"])
                ])
              ];
            }),
            _: 2
          }, 1024),
          vue.createElementVNode("view", new UTSJSONObject({ class: "page-center category-section" }), [
            vue.createVNode(_component_c_category_tab, new UTSJSONObject({ onChange: handlerCategoryChange }))
          ]),
          vue.createElementVNode("view", new UTSJSONObject({ class: "page-center search-section" }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "search-box" }), [
              vue.createElementVNode("form", new UTSJSONObject({ class: "form" }), [
                vue.createVNode(vue.unref(inputSelect), new UTSJSONObject({
                  modelValue: vue.unref(searchText),
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event = null) => {
                    return vue.isRef(searchText) ? searchText.value = $event : null;
                  }),
                  placeholder: "请输入您的问题"
                }), null, 8, ["modelValue"])
              ]),
              vue.createElementVNode("button", new UTSJSONObject({
                class: "btn btn-1",
                onClick: handlerSearch
              }), "搜索答案"),
              vue.createElementVNode("button", new UTSJSONObject({
                class: "btn btn-2",
                onClick: handlerShowModal
              }), "我要提问")
            ]),
            vue.createElementVNode("view", new UTSJSONObject({ class: "right" }), [
              vue.createVNode(vue.unref(typeSelect), new UTSJSONObject({ onChange: handlerTypeSelectChange }))
            ])
          ]),
          vue.createElementVNode("scroll-view", new UTSJSONObject({
            class: "scroll-view",
            style: new UTSJSONObject({ "flex": "1" }),
            onScrolltolower: scrolltolower
          }), [
            vue.createElementVNode("view", new UTSJSONObject({ class: "list page-center" }), [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(list), (item) => {
                return vue.openBlock(), vue.createBlock(vue.unref(qaItem), new UTSJSONObject({
                  key: item.id,
                  item,
                  style: new UTSJSONObject({ "margin-bottom": "22rpx" })
                }), null, 8, ["item"]);
              }), 128))
            ]),
            vue.createVNode(_component_c_scroll_loading_tips, new UTSJSONObject({
              loading: vue.unref(isLoading) && vue.unref(list).length > 0,
              loadend: !vue.unref(isMore) && !vue.unref(isLoading) && vue.unref(list).length > vue.unref(pageInfo).pageSize
            }), null, 8, ["loading", "loadend"]),
            !vue.unref(isLoading) && vue.unref(list).length == 0 ? (vue.openBlock(), vue.createBlock(_component_c_empty, new UTSJSONObject({ key: 0 }))) : vue.createCommentVNode("", true)
          ], 32),
          vue.unref(isShowModal) ? (vue.openBlock(), vue.createBlock(vue.unref(questionModal), new UTSJSONObject({
            key: 1,
            onClose: handlerCloseModal,
            onConfirm: handlerSubmit
          }))) : vue.createCommentVNode("", true)
        ]);
      };
    }
  });
  const _style_0$1 = { "category-section": { "": { "marginBottom": "15rpx" } }, "action-item": { ".navbar ": { "marginLeft": "12rpx", "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "ico": { ".navbar .action-item ": { "width": "12rpx", "height": "12rpx", "marginRight": "2rpx" } }, "text": { ".navbar .action-item ": { "marginLeft": "4.17rpx", "fontSize": "8rpx", "color": "#4F46E5", "lineHeight": "10rpx" } }, "search-section": { "": { "flexDirection": "row", "justifyContent": "space-between", "marginBottom": "16rpx", "zIndex": 1 } }, "search-box": { ".search-section ": { "flexDirection": "row", "alignItems": "center" } }, "btn": { ".search-section ": { "width": "48rpx", "height": "23rpx", "backgroundImage": "none", "backgroundColor": "#FFFFFF", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "4rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": "4rpx", "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#4F46E5", "borderRightColor": "#4F46E5", "borderBottomColor": "#4F46E5", "borderLeftColor": "#4F46E5", "fontSize": "8rpx", "color": "#4F46E5", "lineHeight": "23rpx", "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0 } }, "btn-1": { ".search-section ": { "borderTopLeftRadius": 0, "borderTopRightRadius": "4rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": 0, "marginLeft": "-1rpx", "color": "#ffffff", "backgroundImage": "none", "backgroundColor": "#4F46E5" } }, "btn-2": { ".search-section ": { "marginLeft": "6.25rpx" } } };
  const PagesQuestionAnsIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0$1]]]);
  __definePage("pages/router/router", _sfc_main$w);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/study-report/index", PagesStudyReportIndex);
  __definePage("pages/topic/index", PagesTopicIndex);
  __definePage("pages/topic/chapter", PagesTopicChapter);
  __definePage("pages/note/index", PagesNoteIndex);
  __definePage("pages/question-ans/index", PagesQuestionAnsIndex);
  let namespace = vue.ref("");
  class Storage extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            getStorageSync: { type: "Unknown", optional: false },
            setStorageSync: { type: "Unknown", optional: false },
            removeStorageSync: { type: "Unknown", optional: false }
          };
        }
      };
    }
    constructor(options, metadata = Storage.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.getStorageSync = this.__props__.getStorageSync;
      this.setStorageSync = this.__props__.setStorageSync;
      this.removeStorageSync = this.__props__.removeStorageSync;
      delete this.__props__;
    }
  }
  new Storage({
    getStorageSync(key) {
      return uni.getStorageSync("".concat(namespace.value).concat(key));
    },
    setStorageSync(key, value = null) {
      uni.setStorageSync("".concat(namespace.value).concat(key), value);
    },
    removeStorageSync(key) {
      uni.removeStorageSync("".concat(namespace.value).concat(key));
    }
  });
  const _sfc_main = vue.defineComponent({
    onLaunch: function(options) {
    },
    onShow: function(options) {
    },
    onHide: function() {
    },
    onError: function(err = null) {
    },
    methods: {}
  });
  const _style_0 = { "color": { "": { "color": "#FF0000" } }, "btn": { "": { "borderTopWidth:after": "medium", "borderRightWidth:after": "medium", "borderBottomWidth:after": "medium", "borderLeftWidth:after": "medium", "borderTopStyle:after": "none", "borderRightStyle:after": "none", "borderBottomStyle:after": "none", "borderLeftStyle:after": "none", "borderTopColor:after": "#000000", "borderRightColor:after": "#000000", "borderBottomColor:after": "#000000", "borderLeftColor:after": "#000000" } }, "page-center": { "": { "paddingTop": 0, "paddingRight": "35.42rpx", "paddingBottom": 0, "paddingLeft": "35.42rpx" } } };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]]]);
  const __global__ = typeof globalThis === "undefined" ? Function("return this")() : globalThis;
  __global__.__uniX = true;
  function createApp() {
    const app = vue.createSSRApp(App);
    return {
      app
    };
  }
  createApp().app.mount("#app");
})(Vue);
