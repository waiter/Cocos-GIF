import { GIFParser } from './GIFParser';

// 远程加载时创建覆盖
cc.assetManager.factory.register('.gif', (id, data, options, onComplete) => {
  console.log("Factory", id, data);
  const out = new cc.Asset();
  out._nativeAsset = data;
  onComplete && onComplete(null, out);
});

// 下载时逻辑覆盖
cc.assetManager.downloader.register('.gif', (url, options, onComplete) => {
  console.log("downloader", url);
  cc.assetManager.downloader._downloaders[".bin"](url, options, (err, data) => {
    if (!err) {
      // CC_JSB
      if (typeof data === "string") {
        cc.assetManager.parser.parse(url, data, ".bin", options, onComplete);
        return;
      }
    }
    onComplete(err, data);
  });
});

// 解析时逻辑覆盖
cc.assetManager.parser.register('.gif', (file: ArrayBuffer, options, onComplete) => {
    console.log("parser", file);
    new GIFParser().handle(file, onComplete);
  }
);