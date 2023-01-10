/**
 * スクロールにより現れたり消えたりするポリシーの各項目
 */
class PolicyItem {
  protected element:HTMLElement;
  protected visibilityStartPoint:number;
  protected visibilityEndPoint:number;
  private fadeClassName : string;

  constructor(element:HTMLElement, visibleStart:number, visibleEnd:number, fadeClassName:string) {
    this.element = element;
    this.visibilityStartPoint = visibleStart;
    this.visibilityEndPoint = visibleEnd;
    this.fadeClassName = fadeClassName;
  }

  private isInVisibleArea(scrollAmount:number):boolean {
    if(scrollAmount>this.visibilityStartPoint && scrollAmount<this.visibilityEndPoint) {
      return true;
    } else {
      return false;
    }
  }

  visibleCheck(scrollAmount:number):PolicyItem {
    if(this.isInVisibleArea(scrollAmount)) {
      this.element.classList.add(this.fadeClassName);
    } else {
      this.element.classList.remove(this.fadeClassName);
    }
    return this;
  }
}

/**
 * 各境界線(X軸に平行)のY座標を算出する。
 */
class BoundaryAllocator {
  constructor(itemArray:Array<HTMLElement>) {
    
  }
  
}

export default function scrollEvents(fadeItemClassName:string, fadeupClassName:string):void {

  const scrollAmount = window.pageYOffset;
  const fadeItems = document.getElementsByClassName(fadeItemClassName);
  
};
