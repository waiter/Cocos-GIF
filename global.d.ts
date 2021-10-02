declare namespace cc {
  interface AssetManager {
    factory: any;
  }
  interface Asset {
    _nativeAsset: any;
  }
  interface SpriteFrame {
    _originalSize: cc.Size;
  }
}

declare namespace cc.AssetManager {	
  interface Downloader {
    _downloaders: any;
  }
}