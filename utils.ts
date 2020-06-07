
function calcPercent(numerator: number, denominator: number): string {
    if(denominator == 0){
        return "N/A";
    } else {
        return (100 * numerator / denominator).toFixed(1) + "%";
    }
}