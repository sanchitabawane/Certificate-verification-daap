// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertificateVerification {
    address public admin;
    struct Certificate {
        string studentName;
        string courseName;
        string institution;
        uint256 issueDate;
        bool isValid;
    }
    mapping(string => Certificate) public certificates;
    mapping(string => bool) public certificateExists;

    event CertificateIssued(string indexed certId, string studentName);
    event CertificateRevoked(string indexed certId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }
    constructor() { admin = msg.sender; }

    function issueCertificate(string memory _certId, string memory _studentName, string memory _courseName, string memory _institution) public onlyAdmin {
        require(!certificateExists[_certId], "Already exists");
        certificates[_certId] = Certificate(_studentName, _courseName, _institution, block.timestamp, true);
        certificateExists[_certId] = true;
        emit CertificateIssued(_certId, _studentName);
    }

    function verifyCertificate(string memory _certId) public view returns (string memory, string memory, string memory, uint256, bool) {
        require(certificateExists[_certId], "Not found");
        Certificate memory c = certificates[_certId];
        return (c.studentName, c.courseName, c.institution, c.issueDate, c.isValid);
    }

    function revokeCertificate(string memory _certId) public onlyAdmin {
        require(certificateExists[_certId], "Not found");
        certificates[_certId].isValid = false;
        emit CertificateRevoked(_certId);
    }
}