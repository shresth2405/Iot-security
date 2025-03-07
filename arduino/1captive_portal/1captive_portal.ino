#include <WiFi.h>
#include <WebServer.h>
#include <DNSServer.h>

const char* ssid = "ESP32_Captive_Portal";
const char* nextJsServer = "https://n785hh04-3000.inc1.devtunnels.ms/";  // Your Next.js server IP

WebServer server(80);
DNSServer dnsServer;  // Captive portal DNS server

void handleRedirect() {
    server.sendHeader("Location", nextJsServer, true);
    server.send(302, "text/plain", "");
}

void setup() {
    Serial.begin(115200);

    // Start ESP32 as an access point
    WiFi.softAP(ssid);
    Serial.print("ESP32 Access Point IP: ");
    Serial.println(WiFi.softAPIP());

    // Setup captive portal
    dnsServer.start(53, "*", WiFi.softAPIP());  // Redirect all domains to ESP32
    server.onNotFound(handleRedirect);
    server.begin();
}

void loop() {
    dnsServer.processNextRequest();
    server.handleClient();
}
