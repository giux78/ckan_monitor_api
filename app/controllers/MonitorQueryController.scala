package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import com.mongodb.casbah.MongoClient
import com.mongodb.casbah.Imports._
import play.api.libs.json.Json
import io.swagger.annotations._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
@Api("Monitor")
class MonitorQueryController @Inject() extends Controller {
  
 
 @ApiOperation(value = "List of original catalogs imported",
    notes = "List of original catalogs imported",
    responseContainer = "List")
  def catalogs() = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("monitor_mdb")
    val coll = db("dist_format_by_group")
    val results = coll.distinct("title").toList
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  } 
  
 @ApiOperation(value = "List of all broken links",
    notes = "List of all broken links",
    responseContainer = "List")
   def allBrokenLinks() = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("monitor_mdb")
    val coll = db("ko")
    val results = coll.find().toList
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }
  
  @ApiOperation(value = "List of catalogs name and number of dataset",
    notes = "List of catalogs name and number of dataset",
    responseContainer = "List") 
   def allDatasets() = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("monitor_mdb")
    val coll = db("datasets")
    val results = coll.find().toList
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }
   
  @ApiOperation(value = "All resources grouped by format",
    notes = "All resources grouped by format",
    responseContainer = "List") 
  def allDistributionFormats() = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("monitor_mdb")
    val coll = db("format_dist")
    val results = coll.find().toList
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }
  
  @ApiOperation(value = "All resources grouped by license",
    notes = "All resources grouped by license",
    responseContainer = "List")
  def allDistributionLiceses() = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("monitor_mdb")
    val coll = db("license")
    val results = coll.find().toList
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }
  
  @ApiOperation(value = "All resources grouped by group title",
    notes = "All resources grouped by group title",
    responseContainer = "List")
  def allDistributionGroups() = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("monitor_mdb")
    val coll = db("dist_format_by_group")
    val results = coll.find().toList
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }
  
/*
  # /monitor/catalogs/count/:catalogName
  */
  

   @ApiOperation(value = "Finds number of datasets per catalogue",
    notes = "Finds number of datasets per catalogue",
    responseContainer = "List")
   @ApiResponses(Array(
    new ApiResponse(code = 400, message = "Catalog not exists"),
    new ApiResponse(code = 404, message = "Catalog not exists")))
  def catalogDatasetCount(
      @ApiParam(value = "Name of catalog") 
      catalogName: String) = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("monitor_mdb")
    val coll = db("datasets")
    val catalog = catalogName.replaceAll("_", " ")
    val query = "catalog_parent_name" $eq catalog
    println(query)
    val results = coll.find(query).toList
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }

   @ApiOperation(value = "Distribution of datasets per catalogue grouped by format",
    notes = "Distribution of datasets per catalogue grouped by format",
    responseContainer = "List")
  def catalogDistrubutionFormat(
            @ApiParam(value = "Name of catalog") 
            catalogName: String) = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("monitor_mdb")
    val coll = db("dist_format_by_group")
    val catalog = catalogName.replaceAll("_", " ")
    val query = "title" $eq catalog
    val results = coll.find(query).toList
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }
  
   @ApiOperation(value = "Distribution of datasets per catalogue grouped by license",
    notes = "Distribution of datasets per catalogue grouped by license",
    responseContainer = "List")
  def catalogDistributionLicense(
      @ApiParam(value = "Name of catalog") 
      catalogName: String) = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("monitor_mdb")
    val coll = db("license_cat")
    val catalog = catalogName.replaceAll("_", " ")
    val query = "title" $eq catalog

    val results = coll.find(query).toList
    //  println(results.length)
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }
 
   @ApiOperation(value = "Distribution of datasets per catalogue grouped by group title",
    notes = "Distribution of datasets per catalogue grouped by group title",
    responseContainer = "List")
    def catalogDistrubutionGroups(
        @ApiParam(value = "Name of catalog") 
        catalogName: String) = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("monitor_mdb")
    val coll = db("dataset_by_group")
    val catalog = catalogName.replaceAll("_", " ")
    val query = "catalog_parent_name" $eq catalog
    val results = coll.find(query).toList
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }
    
   @ApiOperation(value = "List of catalogue broken links",
    notes = "List of catalogue broken links",
    responseContainer = "List")
    def catalogBrokenLinks(
        @ApiParam(value = "Name of catalog") 
        catalogName: String) = Action {
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("monitor_mdb")
    val coll = db("ko")
    val catalog = catalogName.replaceAll("_", " ")
    val query = "catalog_parent_name" $eq catalog
    val results = coll.find(query).toList
    mongoClient.close
    val json = com.mongodb.util.JSON.serialize(results)
    Ok(Json.parse(json))
  }
  
}