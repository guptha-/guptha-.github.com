import java.util.*;

public class Fill_array {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int arr[] = new int[5];

		for (int i = 0; i < 5; i++) {
			Arrays.fill(arr, i);
		}
		System.out.println(arr[4]);

	}

}
