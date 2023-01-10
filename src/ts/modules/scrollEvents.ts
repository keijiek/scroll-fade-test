/**
 * スクロールにより現れたり消えたりするポリシーの各項目
 */
class PolicyItem {
  protected element:HTMLElement;
  private fadeClassName : string;
  protected visibleArea :{start:number, end:number};

  constructor(element:HTMLElement, fadeClassName:string, visibleArea :{start:number, end:number}) {
    this.element = element;
    this.fadeClassName = fadeClassName;
    this.visibleArea = visibleArea;
  }

  private isInVisibleArea(scrollAmount:number):boolean {
    if(scrollAmount > this.visibleArea.start  &&  scrollAmount < this.visibleArea.end) {
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
 * 
 */
class BoundaryAllocator {
  private policiesElement:HTMLElement;
  private fadeupbaleItemsLength:number;
  private upperBufferRate:number = 0.00;
  private bottomBufferRate:number = 0.15;

  constructor(policiesElement:HTMLElement, fadeupbaleItemsLength:number) {
    this.policiesElement = policiesElement;
    this.fadeupbaleItemsLength = fadeupbaleItemsLength;
    console.log('BoundaryAllocator is made. ' + this.fadeupbaleItemsLength);
  }

  getBoundaries():Array<{start:number, end:number}> {
    const top:number = this.policiesElement.offsetTop;
    const height:number = this.policiesElement.offsetHeight;
    const upperMargin:number = height * this.upperBufferRate;// 上部の、フェイドアップするまでの余白, フェイドオフするまでの余白
    const bottomMargin:number = height * this.bottomBufferRate;// 下部の、フェイドアップするまでの余白, フェイドオフするまでの余白
    const heightWithoutBuffer = height - upperMargin - bottomMargin;
    const standardHeight = heightWithoutBuffer/this.fadeupbaleItemsLength;// 基準の高さ, fadeup する基準線の間隔

    // ！！！ここに間違いがある。返り値がうまく形成されていない。
    const returnArray:Array<{start:number, end:number}> = [];
    for (let i = 0; i < this.fadeupbaleItemsLength; i++) {
      switch (i) {
        case 0:
          returnArray.push({start:top+upperMargin, end:top+standardHeight*(i+1)});
          break;
        case this.fadeupbaleItemsLength:
          returnArray.push({start:top+standardHeight*(i), end:top+height})
          break;
        default:
          returnArray.push({start:top+standardHeight*(i), end:top+standardHeight*(i+1)});
          break;
      }
    }
    console.log(returnArray);
    return returnArray;
  }
}

export default function scrollEvents(policiesElementId:string, fadeupableItemClassName:string, fadeupClassName:string):void {
  const scrollAmount = window.pageYOffset;
  console.log(scrollAmount);
  const itemArray:Array<HTMLElement> = Array.from(document.querySelectorAll('.'+fadeupableItemClassName));// !!!ここが0だ。なぜか。
  const boundaryAllocator:BoundaryAllocator = new BoundaryAllocator(document.getElementById(policiesElementId)!, itemArray.length);

  const policyItems:Array<PolicyItem> = boundaryAllocator.getBoundaries().map((visibleArea, index) => {
    return new PolicyItem(itemArray[index], fadeupClassName, visibleArea);
  });

  policyItems.forEach((elm) => {
    elm.visibleCheck(scrollAmount);
  });
};
