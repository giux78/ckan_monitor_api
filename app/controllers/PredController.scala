package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import com.mongodb.casbah.MongoClient
import com.mongodb.casbah.Imports._
import play.api.libs.json.Json
import java.util.Random

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class PredController @Inject() extends Controller {
  
   def prediction(roadLcd:String, hour:String, day_of_week:String ) = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("monitor")
    val coll = db("torino_pred_2")
    val selectObject = MongoDBObject("complete_date" -> 0 )
    val query = $and("Road_LCD" $eq roadLcd,"hour" $eq hour, "day_of_week" $eq day_of_week)
    //val r = new Random();
    //val randomValue = 0.50 + (1.50 - 0.50) * r.nextDouble();
    val results = coll.find(query, selectObject).toList
    results.map(println(_))
    //  println(results.length)
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }

}