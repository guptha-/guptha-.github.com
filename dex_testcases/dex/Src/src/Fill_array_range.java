
public class Fill_array_range {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
	    // filled-array and filled-array-range's parameters
	    // refer to the size of the dimensions of the array.
	    
	    int test[][][][][][] = new int[4][4][2][2][2][2];
	    
	    for(int i=0; i<4; i++) {
	      for(int j=0; j<4; j++) {
	        test[i][j][0][0][0][0] = i*j;
	        
	      }
	    }
	    System.out.println(test[3][3][0][0][0][0] == 9);      

	}

}
