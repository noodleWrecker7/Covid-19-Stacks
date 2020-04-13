/*
 * Copyright (c) 2020.
 * Developed by Adam Hodgkinson
 * Last modified 14/4/4 0:55
 *
 * Everything on this page, and other pages on the website, is subject to the copyright of Adam Hodgkinson, it may be freely used, copied, distributed and/or modified, however, full credit must be given
 * to me and any derived works should be released under the same license. I am not held liable for any claim, this software is provided as-is and without any warranty.
 *
 * I do not own any of the following content and is used under their respective licenses:
 *     Fontawesome
 *     Photonstorm's phaser.js
 */
window.onload = function () {
    console.log(getCookie("visited"))
    console.log(getCookie("visited") == "yes")
    if (getCookie("visited") != "yes") {
        let req = new XMLHttpRequest();
        req.open("PUT", "http://local.noodlewrecker.me:3000/visit");
        req.send(JSON.stringify({site: "covid"}));
        setCookie("visited", "yes", 69420)
        console.log("cookie")
    } else {
        console.log("not")
    }

    updateAll();
}


const requrl = "https://api.covid19api.com/summary";

var totalDeathStacks;
var floorDeathStacks;
var remainderDeaths;

var totalRecoveredStacks;
var floorRecoveredStacks;
var remainderRecovered;

var totalConfirmedStacks;
var floorConfirmedStacks;
var remainderConfirmed;

function updateAll() {
    let req = new XMLHttpRequest();
    req.open("GET", requrl);
    req.onload = function () {
        let data = JSON.parse(req.responseText);
        console.log(data);
        totalDeaths = data.Global.TotalDeaths;
        totalRecovered = data.Global.TotalRecovered;
        totalConfirmed = data.Global.TotalConfirmed;
        totalDeathStacks = totalDeaths / 64;
        floorDeathStacks = Math.floor(totalDeathStacks);
        remainderDeaths = totalDeaths % 64;

        totalRecoveredStacks = totalRecovered / 64;
        floorRecoveredStacks = Math.floor(totalRecoveredStacks);
        remainderRecovered = totalRecovered % 64;

        totalConfirmedStacks = totalConfirmed / 64;
        floorConfirmedStacks = Math.floor(totalConfirmedStacks);
        remainderConfirmed = totalConfirmed % 64;

        updateStacksColumn();
        updateCraftingTablesColumns();
        updateFurnaceColumns();
        updateSingleChestsColumns();
        updateDoubleChestsColumns();
        updateInventoriesColumns();
    };
    req.send();
}

function updateStacksColumn() {
    document.getElementById("stat-stack-cases").innerText = floorConfirmedStacks + " Stacks, " + remainderConfirmed + " Items";
    document.getElementById("stat-stack-deaths").innerText = floorDeathStacks + " Stacks, " + remainderDeaths + " Items";
    document.getElementById("stat-stack-recovered").innerText = floorRecoveredStacks + " Stacks, " + remainderRecovered + " Items";
}

function updateCraftingTablesColumns() {

    document.getElementById("stat-craft-cases").innerText = Math.floor(floorConfirmedStacks / 9) + " Tables, " + floorConfirmedStacks % 9 + " Stacks, " + remainderConfirmed + " Items";
    document.getElementById("stat-craft-deaths").innerText = Math.floor(floorDeathStacks / 9) + " Tables, " + floorDeathStacks % 9 + " Stacks, " + remainderDeaths + " Items";
    document.getElementById("stat-craft-recovered").innerText = Math.floor(floorRecoveredStacks / 9) + " Tables, " + floorRecoveredStacks % 9 + " Stacks, " + remainderRecovered + " Items";
}

function updateFurnaceColumns() {
    let totalCoalNeededCases = Math.ceil(totalConfirmed / 8);
    document.getElementById("stat-furnace-cases").innerText = Math.floor(totalCoalNeededCases / 64) + " Stacks, " + totalCoalNeededCases % 64 + " Items of coal";

    let totalCoalNeededDeaths = Math.ceil(totalDeaths / 8);
    document.getElementById("stat-furnace-deaths").innerText = Math.floor(totalCoalNeededDeaths / 64) + " Stacks, " + totalCoalNeededDeaths % 64 + " Items of coal";

    let totalCoalNeededRecovered = Math.ceil(totalRecovered / 8);
    document.getElementById("stat-furnace-recovered").innerText = Math.floor(totalCoalNeededRecovered / 64) + " Stacks, " + totalCoalNeededRecovered % 64 + " Items of coal";
}

function updateSingleChestsColumns() {
    document.getElementById("stat-chests-cases").innerText = Math.floor(floorConfirmedStacks / 27) + " Chests, " + floorConfirmedStacks % 27 + " Stacks, " + remainderConfirmed + " Items";
    document.getElementById("stat-chests-deaths").innerText = Math.floor(floorDeathStacks / 27) + " Chests, " + floorDeathStacks % 27 + " Stacks, " + remainderDeaths + " Items";
    document.getElementById("stat-chests-recovered").innerText = Math.floor(floorRecoveredStacks / 27) + " Chests, " + floorRecoveredStacks % 27 + " Stacks, " + remainderRecovered + " Items";
}

function updateDoubleChestsColumns() {
    document.getElementById("stat-dchests-cases").innerText = Math.floor(floorConfirmedStacks / 54) + " Double Chests, " + floorConfirmedStacks % 54 + " Stacks, " + remainderConfirmed + " Items";
    document.getElementById("stat-dchests-deaths").innerText = Math.floor(floorDeathStacks / 54) + " Double Chests, " + floorDeathStacks % 54 + " Stacks, " + remainderDeaths + " Items";
    document.getElementById("stat-dchests-recovered").innerText = Math.floor(floorRecoveredStacks / 54) + " Double Chests, " + floorRecoveredStacks % 54 + " Stacks, " + remainderRecovered + " Items";
}

function updateInventoriesColumns() {
    document.getElementById("stat-inv-cases").innerText = Math.floor(floorConfirmedStacks / 63) + " Inventories, " + floorConfirmedStacks % 63 + " Stacks, " + remainderConfirmed + " Items";
    document.getElementById("stat-inv-deaths").innerText = Math.floor(floorDeathStacks / 63) + " Inventories, " + floorDeathStacks % 63 + " Stacks, " + remainderDeaths + " Items";
    document.getElementById("stat-inv-recovered").innerText = Math.floor(floorRecoveredStacks / 63) + " Inventories, " + floorRecoveredStacks % 63 + " Stacks, " + remainderRecovered + " Items";
}


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(a) {
    const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

