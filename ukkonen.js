let cmp = 0;



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
    addLeaf(start,suffixStart){
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
}

class Internal extends TreeNode{
    lesserptr = null;//points to the lesser (shorter) counterpart of its variations
    //every internal node except for the one closest to the root has lesserptr
    constructor(base,start,end){
        super(base,start);
        this.end = end;
    }
}



let constructTree = function(str){
    let root = new TreeNode;
    let remainder = 0;
    //activePoint
    let activeNode = root;
    let activeEdge = null;
    let activeLength = 0;//how far it looks at the active edge
    for(let i = 0; i < str.length; i++){
        remainder++;
        let char = str[i];
        if(activeEdge === null){//vanilla insertion, nothing to worrty about
            if(!(char in activeNode.subtrees)){
                //ezpz insert as usual
                remainder--;
                activeNode.addLeaf(i,i-remainder);
            }else{
                //found overlap in child nodes
                //increment the active point, which stores the overlap length
                activeEdge = activeNode.subtrees[char];
                activeLength = 1;//first char overalps
            }
        }else{
            if(!activeEdge.leaf && activeLength >= activeEdge.end-activeEdge.start){
                //current active edge is not long enough to support the inserted substring
                //change the active node, and look at their children
                activeNode = activeEdge;
                activeEdge = activeEdge.subtrees[char];
                activeLength = 0;
            }
            
            if(char === activeEdge.charAt(activeLength)){
                activeLength++;
            }else{
                //successful first insertion
                //split the active edge
                if(activeLength !== 0)activeNode = activeEdge.split(activeLength);
                activeNode.addLeaf(i,i-ramainder);
                while(--remainder){
                    if(activeNode.lesserptr){
                        activeNode = activeNode.lesserptr;
                    }
                }
            }
        }
    }
}



class TreeNode{
    empty = true;
    prefix = null;
    subtrees = {};
    terminal = false;
    addSubstr(str){
        if(this.empty){
            this.empty = false;
            this.prefix = str;
            this.terminal = true;
            return;
        }
        if(str.length < this.prefix.length){
            for(let i = 0; i < str.length; i++){
                cmp++;
                if(this.prefix[i] === str[i])continue;
                this.forkPrefix(i);
                let c2 = new TreeNode();
                c2.addSubstr(str.slice(i));
                this.subtrees[str[i]] = c2;
                return;
            }
            //str matches prefix for its length
            this.forkPrefix(str.length);
            this.terminal = true;
            return;
        }else{
            for(let i = 0; i < this.prefix.length; i++){
                cmp++;
                if(this.prefix[i] === str[i])continue;
                this.forkPrefix(i);
                let c2 = new TreeNode();
                c2.addSubstr(str.slice(i));
                this.subtrees[str[i]] = c2;
                return;
            }
            //str matches prefix
            if(str.length === this.prefix.length){
                this.terminal = true;
                return;
            }
            let newstr = str.slice(this.prefix.length);
            if(!(newstr[0] in this.subtrees)){
                this.subtrees[newstr[0]] = new TreeNode();
            }
            this.subtrees[newstr[0]].addSubstr(newstr);
            return;
        }
    }
    //shorten the prefix, and begin new subtree from index i
    forkPrefix(i){
        let p0 = this.prefix;
        let p1 = p0.slice(0,i);
        let p2 = p0.slice(i);
        //copy this object to a child
        let c1 = new TreeNode();
        c1.empty = false;
        c1.prefix = p2;
        c1.subtrees = this.subtrees;
        c1.terminal = this.terminal;
        this.subtrees = {};
        this.subtrees[p0[i]] = c1;
        this.prefix = p1;
        this.terminal = false;
    }
}


let generateSuffixTree = function(str){
    console.log(str.length);
    let len = str.length;
    let tree = new TreeNode();
    for(let i = len-1; i >= 0; i--){
        let sub = str.slice(i,len);
        tree.addSubstr(sub);
    }
    console.log(cmp);
    return tree;
}

//console.log(generateSuffixTree("banana"));
//console.log(generateSuffixTree("abcabcd"));

generateSuffixTree(`In computer science, Ukkonen's algorithm is a linear-time, online algorithm for constructing suffix trees, proposed by Esko Ukkonen in 1995.[1] The algorithm begins with an implicit suffix tree containing the first character of the string. Then it steps through the string, adding successive characters until the tree is complete. This order addition of characters gives Ukkonen's algorithm its "on-line" property. The original algorithm presented by Peter Weiner proceeded backward from the last character to the first one from the shortest to the longest suffix.[2] A simpler algorithm was found by Edward M. McCreight, going from the longest to the shortest suffix.[3]`/*.split("").map(a=>"a").join("")*/);






