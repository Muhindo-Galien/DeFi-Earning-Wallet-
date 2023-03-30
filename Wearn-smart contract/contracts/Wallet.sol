// SPD-Lisence-Identifier:MIT
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

pragma solidity ^0.8.7;

error Wallet__NotOwner();

interface IyDAI {
    function deposit(uint256 _amount) external;

    function withdraw(uint256 _shares) external;

    function balanceOf(address account) external view returns (uint256);

    function getPricePerFullShare() external view returns (uint256);
}

interface IyUSDC {
    function deposit(uint256 _amount) external;

    function withdraw(uint256 _shares) external;

    function balanceOf(address account) external view returns (uint256);

    function getPricePerFullShare() external view returns (uint256);
}

contract Wallet {
    address admin;

    IERC20 dai = IERC20(0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3);
    IyDAI yDai = IyDAI(0xC2cB1040220768554cf699b0d863A3cd4324ce32);

    IERC20 usdc = IERC20(0x26EA744E5B887E5205727f55dFBE8685e3b21951);
    IyUSDC yUsdc = IyUSDC(0x26EA744E5B887E5205727f55dFBE8685e3b21951);

    constructor() {
        admin = msg.sender;
    }

    function save(uint _amount) external {
        dai.transferFrom(msg.sender, address(this), _amount);
        _save(_amount);
    }

    function saveUSDC(uint _amount) external {
        usdc.transferFrom(msg.sender, address(this), _amount);
        _saveUSDC(_amount);
    }

    function spend(uint amount, address recipient) external {
        if (msg.sender != admin) revert Wallet__NotOwner();
        uint balanceSharesDAI = yDai.balanceOf(address(this));
        uint balanceSharesUSDC = yUsdc.balanceOf(address(this));
        if (balanceSharesDAI > 0) {
            yDai.withdraw(balanceSharesDAI);
            dai.transfer(recipient, amount);
            uint balanceDAI = dai.balanceOf(address(this));
            if (balanceDAI > 0) {
                _save(balanceDAI);
            }
        } else if (balanceSharesUSDC > 0) {
            yUsdc.withdraw(balanceSharesUSDC);
            usdc.transfer(recipient, amount);
            uint balanceUSDC = usdc.balanceOf(address(this));
            if (balanceUSDC > 0) {
                _saveUSDC(balanceUSDC);
            }
        } else {
            revert("No funds available for spending");
        }
    }

    function balance(uint amount) external view returns (uint) {
        uint price = yDai.getPricePerFullShare();
        uint balanceShares = yDai.balanceOf(address(this));
        return price * balanceShares;
    }

    function _save(uint _amount) internal {
        dai.approve(address(yDai), _amount);
        yDai.deposit(_amount);
    }

    function _saveUSDC(uint _amount) internal {
        usdc.approve(address(yUsdc), _amount);
        yUsdc.deposit(_amount);
    }
}
