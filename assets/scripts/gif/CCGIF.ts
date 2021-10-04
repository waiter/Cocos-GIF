import { GIFFrameData } from './GIFParser';

const { ccclass, property, requireComponent, executeInEditMode } = cc._decorator;

@ccclass
@requireComponent(cc.Sprite)
// @executeInEditMode
export default class CCGIF extends cc.Component {
  delays = [];
  sp: cc.Sprite;
  frames: cc.SpriteFrame[] = [];

  @property(cc.Asset)
  asset: cc.Asset = null;

  @property
  local: string = '';

  @property
  remote: string = '';

  start() {
    this.sp = this.node.getComponent(cc.Sprite);
    this.node.active = false;

    if (this.asset) {
      this.do(this.asset._nativeAsset);
    } else if (this.local) {
      cc.resources.load(this.local, (err, data) => {
        console.log('local', err, data);
        this.do(data._nativeAsset);
      });
    } else if (this.remote) {
      cc.assetManager.loadRemote(this.remote, (err, data) => {
        console.log('remote', err, data);
        this.do(data._nativeAsset);
      });
    }
  }
  do(data: GIFFrameData) {
    console.log(data);
    const size = data.spriteFrames[0]._originalSize;
    this.node.setContentSize(size);
    this.delays = data.delays.map((v) => v / 1e2);
    this.frames = data.spriteFrames;
    this.play(true);
  }

  frameIdx = 0;
  play(loop = false, playNext = false) {
    if (!playNext) {
      this.stop();
    }
    if (this.frames.length) {
      if (this.frameIdx >= this.frames.length) {
        this.frameIdx = 0;
        if (!loop) {
          this.node.active = false;
          return;
        }
      }
      this.node.active = true;
      this.sp.spriteFrame = this.frames[this.frameIdx];
      this.scheduleOnce(() => {
        this.play(loop, true);
      }, this.delays[this.frameIdx]);
      this.frameIdx++;
    }
  }
  stop() {
    this.frameIdx = 0;
    this.unscheduleAllCallbacks();
    this.node.active = false;
  }
}
