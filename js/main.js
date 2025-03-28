const [N, M] = input.split(' ').map(Number);
const src = Array.from({ length: N }, (_, i) => i + 1);
const result = [];

function permutation(cnt, selected, visited) {
    if (cnt === 0) {
        result.push(selected.join(' '));
        return;
    }

    for (let i = 0; i < src.length; i++) {
        if (!visited[i]) {
            visited[i] = true;
            selected[selected.length - cnt] = src[i];
            permutation(cnt - 1, selected, visited);
            visited[i] = false;
        }
    }
}

permutation(M, new Array(M), new Array(N).fill(false));
console.log(result.join('\n'));