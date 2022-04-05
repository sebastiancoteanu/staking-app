pragma solidity ^0.8.0;

/*
** Tether
** totalSupply - 1 million tokens
*/

contract Rwd {
    string public name = 'Reward Token';
    string public symbol = 'RWD';
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

    error InsufficientBalance(uint _requested, uint _available);

    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(address indexed _owner, address indexed _spender, uint _value);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        
        return true;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        if (balanceOf[msg.sender] < _value) {
            revert InsufficientBalance(_value, balanceOf[msg.sender]);
        }

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool succes) {
        if (balanceOf[_from] < _value) {
            revert InsufficientBalance(_value, balanceOf[_from]);
        }

        if (allowance[_from][msg.sender] < _value) {
            revert InsufficientBalance(_value, balanceOf[_from]);
        }

        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}