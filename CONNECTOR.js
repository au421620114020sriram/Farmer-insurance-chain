[10/30, 7:54 PM] ~SRIRAM@~V.K@~: INDEX.HTML
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Insurance {
struct InsurancePolicy {
address holder;
string policyNumber;
uint256 premiumAmount;
uint256 coverageAmount;
uint256 expirationTimestamp;
}
mapping(uint256 => InsurancePolicy) public policies;
uint256 public policyCount;
event PolicyAdded(uint256 policyId, address holder, string policyNumber, uint256
premiumAmount, uint256 coverageAmount, uint256 expirationTimestamp);
event PolicyUpdated(uint256 policyId, uint256 premiumAmount, uint256 coverageAmount, uint256 expirationTimestamp);
modifier onlyHolder(uint256 _policyId) {
[10/30, 7:54 PM] ~SRIRAM@~V.K@~: require(policies[_policyId].holder == msg.sender, "Only the policy holder can perform
this action"); _;
}
function addPolicy(string memory _policyNumber, uint256 _premiumAmount, uint256
_coverageAmount, uint256 _expirationTimestamp) external {
policyCount++;
policies[policyCount] = InsurancePolicy(msg.sender, _policyNumber, _premiumAmount, _coverageAmount, _expirationTimestamp);
emit PolicyAdded(policyCount, msg.sender, _policyNumber, _premiumAmount, _coverageAmount, _expirationTimestamp);
}
function updatePolicy(uint256 _policyId, uint256 _premiumAmount, uint256
_coverageAmount, uint256 _expirationTimestamp) external onlyHolder(_policyId) {
InsurancePolicy storage policy = policies[_policyId];
policy.premiumAmount = _premiumAmount;
policy.coverageAmount = _coverageAmount;
policy.expirationTimestamp = _expirationTimestamp;
emit PolicyUpdated(_policyId, _premiumAmount, _coverageAmount, _expirationTimestamp);
}
function getPolicyDetails(uint256 _policyId) external view returns (address holder, string
memory policyNumber, uint256 premiumAmount, uint256 coverageAmount, uint256
expirationTimestamp) {
InsurancePolicy memory policy = policies[_policyId];
return (policy.holder, policy.policyNumber, policy.premiumAmount, policy.coverageAmount, policy.expirationTimestamp);
}
}
CONNECTOR.JS
const { ethers } = require("ethers");
const abi = [
{
[10/30, 7:54 PM] ~SRIRAM@~V.K@~: "anonymous": false, "inputs": [
{
"indexed": false, "internalType": "uint256", "name": "policyId", "type": "uint256" },{
"indexed": false, "internalType": "address", "name": "holder", "type": "address" },{
"indexed": false, "internalType": "string", "name": "policyNumber", "type": "string" },{
"indexed": false, "internalType": "uint256", "name": "premiumAmount", "type": "uint256" },{
"indexed": false, "internalType": "uint256", "name": "coverageAmount", "type": "uint256" },{
"indexed": false, "internalType": "uint256", "name": "expirationTimestamp", "type": "uint256" }
],"name": "PolicyAdded", "type": "event" },{
"anonymous": false, "inputs": [
{
"indexed": false,
[10/30, 7:55 PM] ~SRIRAM@~V.K@~: "internalType": "uint256", "name": "policyId", "type": "uint256" },{
"indexed": false, "internalType": "uint256", "name": "premiumAmount", "type": "uint256" },{
"indexed": false, "internalType": "uint256", "name": "coverageAmount", "type": "uint256" },{
"indexed": false, "internalType": "uint256", "name": "expirationTimestamp", "type": "uint256" }
],"name": "PolicyUpdated", "type": "event" },{
"inputs": [
{
"internalType": "string", "name": "_policyNumber", "type": "string" },{
"internalType": "uint256", "name": "_premiumAmount", "type": "uint256" },{
"internalType": "uint256", "name": "_coverageAmount", "type": "uint256" },{
"internalType": "uint256", "name": "_expirationTimestamp", "type": "uint256"
[10/30, 7:55 PM] ~SRIRAM@~V.K@~: }
],"name": "addPolicy", "outputs": [], "stateMutability": "nonpayable", "type": "function" },{
"inputs": [
{
"internalType": "uint256", "name": "_policyId", "type": "uint256" }
],"name": "getPolicyDetails", "outputs": [
{
"internalType": "address", "name": "holder", "type": "address" },{
"internalType": "string", "name": "policyNumber", "type": "string" },{
"internalType": "uint256", "name": "premiumAmount", "type": "uint256" },{
"internalType": "uint256", "name": "coverageAmount", "type": "uint256" },{
"internalType": "uint256", "name": "expirationTimestamp", "type": "uint256" }
],"stateMutability": "view", "type": "function" },{
[10/30, 7:55 PM] ~SRIRAM@~V.K@~: "inputs": [
{
"internalType": "uint256", "name": "", "type": "uint256" }
],"name": "policies", "outputs": [
{
"internalType": "address", "name": "holder", "type": "address" },{
"internalType": "string", "name": "policyNumber", "type": "string" },{
"internalType": "uint256", "name": "premiumAmount", "type": "uint256" },{
"internalType": "uint256", "name": "coverageAmount", "type": "uint256" },{
"internalType": "uint256", "name": "expirationTimestamp", "type": "uint256" }
],"stateMutability": "view", "type": "function" },{
"inputs": [], "name": "policyCount", "outputs": [
{
"internalType": "uint256", "name": "", "type": "uint256" }
[10/30, 7:56 PM] ~SRIRAM@~V.K@~: ],"stateMutability": "view", "type": "function" },{
"inputs": [
{
"internalType": "uint256", "name": "_policyId", "type": "uint256" },{
"internalType": "uint256", "name": "_premiumAmount", "type": "uint256" },{
"internalType": "uint256", "name": "_coverageAmount", "type": "uint256" },{
"internalType": "uint256", "name": "_expirationTimestamp", "type": "uint256" }
],"name": "updatePolicy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
]
if (!window.ethereum) {
alert('Meta Mask Not Found')
window.open("https://metamask.io/download/")
}
export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();
export const address = "0xd91BQZKqdp2CV3QV5nUEsqSg1ygegLmqRygj" export const contract = new ethers.Contract(address, abi, signer)