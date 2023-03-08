//important note to self!
//don't make it complex, make it simple and quick af



class TreeNode{
    parent = null;
    subtrees = {};
    constructor(base,start){
        this.base = base;
        this.start = start;
    }
    charAt(n){
        return this.base[this.start+n];
    }
    split(i){
        let internalNode = new Internal(this.base,this.start,this.start+i);
        //replace parent's this position with that of the internal node
        this.parent[internalNode.charAt(0)] = internalNode;
        internalNode.parent = this.parent;
        
        this.start += i;
        internalNode.subtrees[this.charAt(0)] = this;
        this.parent = internalNode;
        return internalNode;
    }
    insertLeaf(start,suffixStart){
        let c = this.base[start];
        let leaf = new Leaf(this.base,start,suffixStart);
        this.subtrees[char] = leaf;
        leaf.parent = this;
    }
}



class Leaf extends TreeNode{
    constructor(base,start,suffixStart){
        super(base,start);
        this.suffixStart = suffixStart;
    }
    get length(){
        return this.base.length-this.start;
    }
}

class Internal extends TreeNode{
    lesserptr = null;//points to the lesser (shorter) counterpart of its variations
    //every internal node except for the one closest to the root has lesserptr
    constructor(base,start,end){
        super(base,start);
        this.end = end;
    }
    get length(){
        return this.end-thsi.start;
    }
}



let ukkonen = function(str){
    let root = new TreeNode;
    let remainder = 0;
    //activePoint
    let activeNode = root;
    let activeEdge = null;
    let activeIndex = 0;//how far it looks at the active edge
    for(let i = 0; i < str.length; i++){
        remainder++;
        let char = str[i];
        if(activeEdge === null){//at the base of the active node
            if(char in activeNode.subtrees){
                activeEdge = activeNode.subtrees[char];
                activeIndex = 1;
                continue;
            }else{
                while(activeNode){
                    //add the substring to the active node
                    remainder--;
                    activeNode.insertLeaf(i,i-remainder);
                    activeNode = activeNode.lesserptr;
                }
                console.log(`remainder: ${remainder}. This better be zero`);
                activeNode = root;
                activeEdge = null;
                activeIndex = 0;
                remainder = 0;
            }
        }else{//at one of the edges
            if(activeIndex === activeEdge.length){
                activeNode = activeEdge;
                activeEdge = null;
                activeIndex = 0;
                i--;
                continue;
            }
            if(char === activeEdge.charAt(activeIndex)){
                activeIndex++;
                continue;
            }else{//different character, split the edge
                let internal = activeEdge.split(activeIndex);
                while(remainder--){
                    if(activeEdge.lesserptr){
                        activeEdge = 
                    }else{
                        
                    }
                }
                
                remainder--;
                internal.insertLeaf(i,i-remainder);
                
            }
        }
    }
}




