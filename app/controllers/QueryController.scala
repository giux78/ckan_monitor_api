package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import com.mongodb.casbah.MongoClient
import com.mongodb.casbah.Imports._
import play.api.libs.json.Json

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class QueryController @Inject() extends Controller {

  def all(collName:String) = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("new_monitor")
    val coll = db(collName)
    //  val queryObject = MongoDBObject()

    val results = coll.find().toList
    //  println(results.length)
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }
  
    def categories() = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("new_monitor")
    val coll = db("dist_format_by_group")

    val results = coll.distinct("title").toList
    //  println(results.length)
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }

   def catalogQ(collName:String, catalogName:String) = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("new_monitor")
    val coll = db(collName)
    val catalog = catalogName.replaceAll("_", " ")
    val query = "catalog_parent_name" $eq catalog

    val results = coll.find(query).toList
    //  println(results.length)
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }
   
   def formatDist(collName:String, catalogName:String) = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("new_monitor")
    val coll = db(collName)
    val catalog = catalogName.replaceAll("_", " ")
    val query = "title" $eq catalog

    val results = coll.find(query).toList
    //  println(results.length)
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }


}

