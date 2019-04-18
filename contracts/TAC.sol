pragma solidity >=0.4.0 <0.7.0;

contract TAC {
    string name ;
    string symbol;
    uint8 decimal;
    uint256 supply;

    string tokenName = "TAC Token";
    string tokenSymbol = "TAC";
    uint256 initialSypply = 10000000;

   // Balances for each account
    mapping(address => uint256) balances;

    // Owner of account approves the transfer of an amount to another account
    mapping(address => mapping (address => uint256)) allowed;

    constructor () public {
        name = tokenName;
        symbol = tokenSymbol;
        supply = initialSypply*10**uint256(decimal);
        balances[msg.sender] = supply;
    }


    function totalSupply() public view returns (uint) {
        return supply;
    }

    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }
    function getBalance() public view returns (uint balance) {
        return balanceOf(msg.sender);
    }


    function transfer(address to, uint tokens) public returns (bool success) {
        require(balances[msg.sender] >= tokens);
        balances[to] += tokens;
        balances[msg.sender] -= tokens;
        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        require(balances[from] >= tokens);
        require(allowed[from][msg.sender] >= tokens);
        balances[to] += tokens;
        allowed[from][msg.sender] -= tokens;
        emit Transfer(from, to, tokens);
        return true;
    }

    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}
