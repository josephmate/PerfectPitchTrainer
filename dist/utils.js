function calcPercentString(numerator, denominator) {
    if (denominator == 0) {
        return "N/A";
    }
    else {
        return (100 * numerator / denominator).toFixed(1) + "%";
    }
}
function calcPercent(numerator, denominator) {
    if (denominator == 0) {
        return 0;
    }
    else {
        return (100 * numerator / denominator);
    }
}
