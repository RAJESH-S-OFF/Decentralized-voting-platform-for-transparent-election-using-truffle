// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
contract SimpleStorage{
    uint256 number=0;
    function setter(uint256 _number) external{
        number=_number;
    }
    function getter() external view returns(uint256){
        return number;
    }

}