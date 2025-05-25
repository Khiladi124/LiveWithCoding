import java.util.*;

public class TwoSumSorted {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();            // Read array length
        int target = sc.nextInt();       // Read target sum
        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();       // Read array elements
        }

        // Create a list of value-index pairs
        int[][] arrWithIndex = new int[n][2];
        for (int i = 0; i < n; i++) {
            arrWithIndex[i][0] = arr[i];   // value
            arrWithIndex[i][1] = i;        // original index
        }

        // Sort by value
        Arrays.sort(arrWithIndex, Comparator.comparingInt(a -> a[0]));

        int l = 0, r = n - 1;

        while (l < r) {
            int sum = arrWithIndex[l][0] + arrWithIndex[r][0];
            if (sum == target) {
                System.out.println(arrWithIndex[l][1] + " " + arrWithIndex[r][1]);
                break;
            } else if (sum > target) {
                r--;
            } else {
                l++;
            }
        }

        sc.close();
    }
}
