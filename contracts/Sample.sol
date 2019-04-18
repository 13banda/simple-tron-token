pragma solidity >=0.4.0 <0.7.0;

contract Simple {
    uint storageData;

    event Update(uint data);

    function set(uint i) public {
        storageData = i;
        emit Update(i);
    }
    function get() public view returns (uint) {
        return storageData;
    }
}
