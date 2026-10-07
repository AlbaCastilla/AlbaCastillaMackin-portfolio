import { MetadataRoute } from "next";
import { gethomePosts } from "./lib/posts";
import { metaData } from "./lib/config";

const BaseUrl = metaData.baseUrl.endsWith("/")
  ? metaData.baseUrl
  : `${metaData.baseUrl}/`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let homes = getHomePosts().map((post) => ({
    url: `${BaseUrl}home/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["", "home", "projects", "photos"].map((route) => ({
    url: `${BaseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...homes];
}
