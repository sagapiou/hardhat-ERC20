// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20TokenForFactory is ERC20 {
  constructor(
    string memory name,
    string memory symbol,
    uint256 _initialSupply,
    address _ERC20Owner
  ) ERC20(name, symbol) {
    _mint(_ERC20Owner, _initialSupply);
  }
}

contract ERC20Factory {
  address[] public deployedERC20;

  event ERC20TokenCreated(address tokenAddress);

  function deployNewERC20Token(
    string calldata name,
    string calldata symbol,
    uint256 initialSupply
  ) public returns (address) {
    address ERC20TokenAddress = address(
      new ERC20TokenForFactory(name, symbol, initialSupply, msg.sender)
    );
    deployedERC20.push(ERC20TokenAddress);
    emit ERC20TokenCreated(ERC20TokenAddress);
    return ERC20TokenAddress;
  }

  function getDeployedERC20() public view returns (address[] memory) {
    return deployedERC20;
  }
}
