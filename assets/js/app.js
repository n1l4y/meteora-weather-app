/**
 * @author n1l4y <nilayshah630@gmail.com>
 */

"use strict";

import { fetchData, url } from "./api.js";
import * as module from "./module.js";

/**
 * Add event listeners on multiple elements
 * @param {NodeList} elements Elements node array
 * @param {string} eventType e.g.: 'click'
 * @param {function} callback Callback function
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (const element of elements) element.addEventListener(eventType, callback);
};

/*
    Toggle search for mobile
*/

const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const toggleSearch = () => searchView.classList.toggle("active");
addEventOnElements(searchTogglers, "click", toggleSearch);

/*
    Search Integration
*/
const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;
const searchTimeoutDuration = 500;

searchField.addEventListener("input", () => {
  searchTimeout ?? clearTimeout(searchTimeout);

  if (!searchField.value) {
    searchResult.classList.remove("active");
    searchResult.innerHTML = "";
    searchField.classList.remove("searching");
  } else {
    searchField.classList.add("searching");
  }

  if (searchField.value) {
    searchTimeout = setTimeout(() => {
      fetchData(url.geo(searchField.value), (locations) => {
        searchField.classList.remove("searching");
        searchResult.classList.add("active");
        searchResult.innerHTML = `
            <ul class="view-list" data-search-list>

                <li class="view-item">
                    <span class="m-icon">location_on</span>

                    <div>
                        <p class="item-title">London</p>
                        <p class="label-2 item-subtitle">State of London, GB</p>
                    </div>

                    <a href="#" class="item-link has-state" data-search-toggler></a>
                </li>

            </ul>
        `;
      });
    }, searchTimeoutDuration);
  }
});
