public class iput_object {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Setter_iobject t = new Setter_iobject();

		//System.out.println("Result should be null");
		System.out.println(t.i_set());

	}

}

class Setter_iobject {
	public Object i;

	public Object i_set() {
		return this.i;
	}
}