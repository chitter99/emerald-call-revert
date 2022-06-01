//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Test {
    // @dev placeholder
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes("helloWorld()")));

    address private _other;

    constructor(address other) {
        _other = other;
    }

    function callShouldRevert() external {
        // @dev used same method as yuzu swap
        // https://github.com/Yuzu-swap/yuzuswap-contract/blob/main/contracts/uniswapv2/UniswapV2Pair.sol#L51
        (bool success, bytes memory data) = _other.call(
            abi.encodeWithSelector(SELECTOR)
        );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "Test: Expected behavior!"
        );
    }

    function directRevert() external {
        revert("Test: Expected behavior!");
    }
}
