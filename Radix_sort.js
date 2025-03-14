/*
    *****************
    DONE BY:-   Unnatidhar Sharma
    
    *****************
*/


async function radixSort(array) {
    let maxNum = Math.max(...array); 
    let exp = 1; // Exponent (1, 10, 100, ...)

    while (Math.floor(maxNum / exp) > 0) {
        await countingSortByDigit(array, exp);
        exp *= 10; // Move to next significant digit
    }
}

async function countingSortByDigit(array, exp) {
    let output = new Array(array.length).fill(0);
    let count = new Array(10).fill(0);

    // Count occurrences of each digit at the current place value
    for (let i = 0; i < array.length; i++) {
        let digit = Math.floor(array[i] / exp) % 10;
        count[digit]++;
        await highlightElement(i, "yellow"); // Highlight current element
    }

    // Convert count[] to prefix sum to determine correct positions
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build output array from the end to maintain stability
    for (let i = array.length - 1; i >= 0; i--) {
        let digit = Math.floor(array[i] / exp) % 10;
        output[count[digit] - 1] = array[i];
        count[digit]--;
        await highlightElement(i, "green"); // Mark sorted position
    }

    // Copy sorted numbers back to the original array
    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
        await updateArrayVisual(array, i); // Update visualization
    }
}

// Register Radix Sort in the sorting buttons
document.getElementById("radixSortBtn").addEventListener("click", async function() {
    let array = getArrayValues(); // Get the array from the visualizer
    await radixSort(array);
    markSorted(); // Mark the array as sorted
});


/*
    *****************
    DONE BY:-   Unnatidhar Sharma
    
    *****************
*/