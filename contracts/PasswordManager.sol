// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract PasswordManager {
    struct Credentials {
        string website;
        string username;
        string password;
    }

    mapping (string => Credentials) private credentials;

    function saveCredentials(string memory _website, string memory _username, string memory _password) public {
        credentials[_website] = Credentials(_website, _username, _password);
    }

    function getCredentials(string memory _website) public view returns (string memory) {
        Credentials memory cred = credentials[_website];
        if (bytes(cred.website).length != 0) {
            return string(abi.encodePacked(cred.website, ",", cred.username, ",", cred.password));
        } else {
            return "";
        }
    }

    function updatePassword(string memory _website, string memory _newPassword) public {
        require(bytes(_newPassword).length != 0, "PasswordManager: new password cannot be empty");

        Credentials storage cred = credentials[_website];
        require(bytes(cred.website).length != 0, "PasswordManager: credentials do not exist for website");

        cred.password = _newPassword;
        credentials[_website] = cred;
    }
}



