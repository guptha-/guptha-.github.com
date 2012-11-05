import java.util.Date;
public class Const_class {
	

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
        Date date = new Date();        
        Class dateClass = date.getClass();
        String canonical = dateClass.getCanonicalName();
        System.out.println(canonical);

    }
}