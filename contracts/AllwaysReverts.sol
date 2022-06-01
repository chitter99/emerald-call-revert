//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract AllwaysReverts {
    constructor() {
        // @dev to prevent revert on deployment
    }

    fallback() external payable {
        revert("AllwaysReverts: Expected behavior!");
    }
}
